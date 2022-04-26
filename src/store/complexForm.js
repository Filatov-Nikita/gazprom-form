import { serialize } from 'object-to-formdata';
import cleaner from 'deep-cleaner';

const domain = process.env.NODE_ENV === 'development' ? 'http://mrg.danat.su' : window.location.origin;
const base = `${domain}/local/templates/gas/components/openregion/news/requests-tech-connection/openregion/news.edit/.default/ajax/`;
const socialBase = `${domain}/local/templates/gas/components/openregion/news/requests-tech-connection-social/openregion/news.edit/.default/ajax/`;
const emailBase = `${domain}/local/templates/gas/ajax/`;
const Authorization = '50e733f3d0cc869612470dfa7feb98e2';

export default {
  namespaced: true,
  actions: {
    async getLetter(_c, { id, social = false }) {
      const url = new URL(`get_letter.php`, social ? socialBase : base);
      url.searchParams.append('request_id', id);
      const response = await fetch(url, { headers: { Authorization } });
      return response.json();
    },
    async showFiles(_c, { fileId }) {
      const url = new URL(`api/v1.0.0/files/${fileId}`, domain);
      const response = await fetch(url, { headers: { Authorization } });
      return response.json();
    },
    async show(_c, { id }) {
      const url = new URL(`api/v1.0.0/requests/${id}`, domain);
      const response = await fetch(url, { headers: { Authorization } });
      return await response.json();
    },
    async getEmail() {
      const url = new URL('user_mail.php', emailBase);
      const response = await fetch(url);
      return response.json();
    },
    async create(_c, opts) {

      const {
        edit = false,
        social = false,
        data,
        meta: { is_draft, is_sign, is_letter, request_id },
      } = opts;

      const { comment, files, ...other } = data;

      const cleanedData = cleaner(other);

      const json = {
        comment,
        files,
        request_id,
        is_draft,
        is_sign,
        is_letter,
        data: cleanedData,
      };

      if(edit) json.id = opts.id;

      const formData = serialize(
        json,
        { indices: true, allowEmptyArrays: true }
      );

      const url = new URL(edit ? 'edit.php' : 'save.php', social ? socialBase : base);

      const response = await fetch(url, {
        headers: {
          Accept: 'application/json',
        },
        method: 'POST',
        body: formData,
      });

      return response.json();
    },
  },
};
