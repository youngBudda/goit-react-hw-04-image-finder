import axios from 'axios';

export const requestImages = async (tag, page) => {
  const { data } = await axios.get('https://pixabay.com/api/', {
    params: {
      key: '37633155-9cc69d2c24fc24ba983caa040',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      q: tag,
      per_page: 12,
      page: page,
    },
  });
  return data;
};
