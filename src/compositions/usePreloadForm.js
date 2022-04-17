import { useField } from 'vee-validate';
import { useStore } from 'vuex';
import { getPrettyDate } from '@/helpers';

export default function (setValues) {
  const store = useStore();
  const params = new URLSearchParams(window.location.search);
  let id = params.get('id');
  if (typeof id !== 'string') return;
  if (!/^[0-9]+$/g.test(id)) return;

  useField('uploadedFiles');

  show();

  return id;

  function getName(src) {
    return src.substr(src.lastIndexOf('/') + 1);
  }

  async function getFile(fileId) {
    const { file } = await store.dispatch('complexForm/showFiles', { fileId });
    return getName(file.src);
  }

  async function upload(fileList) {
    const names = await Promise.all(fileList.map(getFile));
    return names;
  }

  async function uploadDocuments(documents) {
    const filledDocs = Object.entries(documents).filter(([_key, fileList]) => fileList.length > 0);
    const uploadedDocs = await Promise.all(
      filledDocs.map(async ([key, fileList]) => {
        const names = await upload(fileList);
       return [key, names];
      })
    );

    const mocks = uploadedDocs.map(([key]) => {
      return [key, null]
    });

    const docMocks = Object.fromEntries(mocks);
    const docNames = Object.fromEntries(uploadedDocs);

    return {
      docMocks,
      docNames
    }
  }

  async function uploadAttached(attached) {
    if(!attached) return null;
    const attachedNames = await upload(attached);
    return attachedNames;
  }

  function converToDate(timestamp) {
    if(+timestamp === -1) return '';
    return new Date(timestamp * 1000);
  }

  async function show() {
    try {
      const { request: { data, files, comment } } = await store.dispatch('complexForm/show', { id: +id });

      setValues(data);

      const documents = data.documents_upload;
      const { docNames, docMocks } = await uploadDocuments(documents);
      const attachedNames = await uploadAttached(files);

      let document_date_issue = data.personal_data.document_date_issue;
      document_date_issue = getPrettyDate(converToDate(document_date_issue)).value;
      let document_date_issue2 = data.proxy_data.document_date_issue;
      document_date_issue2 = getPrettyDate(converToDate(document_date_issue2)).value;

      const values = {
        ...data,
        personal_data: {
          ...data.personal_data,
          document_date_issue
        },
        proxy_data: {
          ...data.proxy_data,
          document_date_issue: document_date_issue2
        },
        documents_upload: { ...data.documents_upload, ...docMocks },
        primary_information: { ...data.primary_information},
        comment,
        files: null,
        uploadedFiles: { docs: docNames, files: attachedNames }
      };

      setValues(values);
    } catch(e) {
      console.log(e);
      alert('не удалось загрузить данные формы');
    }
  }
}
