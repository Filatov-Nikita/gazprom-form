import { serialize } from 'object-to-formdata';
import cleaner from 'deep-cleaner';

const domain = process.env.NODE_ENV === 'development' ? 'http://mrg.danat.su' : window.location.origin;
const base = `${domain}/local/templates/gas/components/openregion/news/requests-tech-connection/openregion/news.edit/.default/ajax/`;
const socialBase = `${domain}/local/templates/gas/components/openregion/news/requests-tech-connection-social/openregion/news.edit/.default/ajax/`;
const emailBase = `${domain}/local/templates/gas/ajax/`;

export default {
  namespaced: true,
  actions: {
    async getEmail() {
      const url = new URL('user_mail.php', emailBase);
      const response = await fetch(url);
      return await response.json();
    },
    async create(
      _c,
      {
        social = false,
        data,
        meta: { is_draft, is_sign, is_letter, request_id },
      }
    ) {
      const { comment, files, ...other } = data;

      const cleanedData = cleaner(other);

      const formData = serialize(
        {
          comment,
          files,
          request_id,
          is_draft,
          is_sign,
          is_letter,
          data: cleanedData,
        },
        { indices: true, allowEmptyArrays: true }
      );

      const url = new URL('save.php', social ? socialBase : base);
      const response = await fetch(url, {
        headers: {
          Accept: 'application/json',
        },
        method: 'POST',
        body: formData,
      });

      const responseData = await response.json();

      return responseData;
    },
  },
};
