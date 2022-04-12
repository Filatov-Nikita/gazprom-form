import { useField } from 'vee-validate';
import { useStore } from 'vuex';

export default async function (setValues) {
  const store = useStore();
  const params = new URLSearchParams(window.location.search);
  let id = params.get('id');
  if (typeof id !== 'string') return;
  if (!/^[0-9]+$/g.test(id)) return;

  useField('primary_information.uploadedFiles');

  show();

  async function getFile([key, ids]) {
    const requests = ids.map(fileId => store.dispatch('complexForm/showFiles', { fileId }))
    const responses = await Promise.all(requests);
    const srcList = responses.map(({ file }) => file.src);

    const names = srcList.map(getName);

    function getName(src) {
      return src.substr(src.lastIndexOf('/') + 1);
    }

    return [key, names]
  }

  function createMockFile([ key, names ]) {
    const mockFiles = names.map(name => new File([], name));
    return [key, mockFiles];
  }

  async function show() {
    try {
      const { request: { data } } = await store.dispatch('complexForm/show', { id: +id });

      setValues(data);

      const files = data.documents_upload;
      const filledFiles = Object.entries(files).filter(([_key, fileList]) => fileList.length > 0 );
      const requests = filledFiles.map(getFile);
      const names = await Promise.all(requests);
      const mocks = names.map(createMockFile)
      const fileValues = Object.fromEntries(mocks);
      const keys = Object.keys(fileValues);

      const values = {
        ...data,
        documents_upload: { ...data.documents_upload, ...fileValues },
        primary_information: { ...data.primary_information, uploadedFiles: keys}
      };

      setValues(values);
    } catch(e) {
      console.log(e);
      alert('не удалось загрузить данные формы');
    }
  }
}
