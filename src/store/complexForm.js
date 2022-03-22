import { serialize } from 'object-to-formdata';
import cleaner from 'deep-cleaner';

const base =
  'http://mrg.danat.su/local/templates/gas/components/openregion/news/requests-tech-connection/openregion/news.edit/.default/ajax/';

export default {
  namespaced: true,
  actions: {
    async create(
      _c,
      { data, meta: { is_draft, is_sign, is_letter, request_id } }
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

      const url = new URL('save.php', base);
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
