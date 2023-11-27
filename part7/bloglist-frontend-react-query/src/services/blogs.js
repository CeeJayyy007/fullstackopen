import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);

  return response.data;
};

const update = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(
    `${baseUrl}/${newObject.id}`,
    newObject,
    config
  );

  return response.data;
};

const comment = async (commentToAdd, id) => {
  const config = {
    headers: { Authorization: token },
  };

  const comment = { comment: commentToAdd };

  const response = await axios.put(
    `${baseUrl}/${id}/comments`,
    comment,
    config
  );

  return response.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(`${baseUrl}/${id}`, config);

  return response.data;
};

export default { getAll, create, setToken, update, comment, remove };
