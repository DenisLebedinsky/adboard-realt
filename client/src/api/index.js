import axios from 'axios';

export const fetchItemsApi = async () => {
  return fetch('/house')
    .then(res => res.json())
    .then(list => list.house);
};

export const fetchItemsCheckApi = async token => {
  return fetch('/houseCheck/check', {
    headers: {
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      authorization: token,
    },
  })
    .then(res => res.json())
    .then(list => list.house);
};

export const loadMoreItemsApi = async ({ offset }, categoryId) => {
  return fetch(`/house/more/${offset}&${categoryId}`)
    .then(res => res.json())
    .then(data => data.house);
};

export const fetchItemByIDApi = async id => {
  return fetch(`/house/${id}`)
    .then(res => res.json())
    .then(data => data.house);
};

export const fetchCategoriesApi = async () => {
  return fetch('/category')
    .then(res => res.json())
    .then(data => data.category);
};

export const fetchItemsBySearchApi = async strSearch => {
  return fetch('/house/search', {
    method: 'post',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    body: 'str=' + strSearch,
  })
    .then(res => res.json())
    .then(data => data.house);
};

export const sendAdToServerApi = async nitem => {
  const data = new FormData();
  for (let key in nitem.img) data.append('img[]', nitem.img[key]);
  data.append('name', nitem.name);
  data.append('description', nitem.description);
  data.append('price', nitem.price);
  data.append('categoryId', nitem.categoryId);
  data.append('email', nitem.email);
  data.append('tel', nitem.tel);
console.log('go')
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };
  axios.post('/house', data, config);
};

export const patchonServerApi = async (nitem, token) => {
  let data = new FormData();
  for (let key in nitem.img) data.append('img[]', nitem.img[key]);
  data.append('id', nitem.id);
  data.append('name', nitem.name);
  data.append('description', nitem.description);
  data.append('price', nitem.price);
  data.append('categoryId', nitem.categoryId);
  data.append('email', nitem.email);
  data.append('tel', nitem.tel);
  data.append('status', nitem.status);

  const config = {
    headers: {
      'content-type': 'multipart/form-data',
      authorization: token,
    },
  };
  axios.patch('/house/update', data, config);
};


export const fetchAuthApi = async (username, password) => {
  return fetch('/users/authenticate', {
    method: 'POST',
    body: `username=${username}&password=${password}`,
    headers: {
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
  })
    .then(res => res.json())
    .then(data => data);
};

export const dellItemApi = async (id, token) => {
  const url = '/houseCheck/del/'+id;
  const config = {
    headers: {
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      authorization: token,
    }
  };

  return axios.delete(url, config);
  };

export const chekingItemApi = async (id, token) => {
  let data = new FormData();
  data.append('id', id);
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
      authorization: token,
    },
  };
  axios.patch('/house/changestatus', data, config);
};


export const categoryAddApi = async (category, token) => {
  
  const body= JSON.stringify(category);

  const config = {
    headers: {
      'Content-type': 'application/json',
      authorization: token
    }
  };
  axios.post('/category',body, config);
};

export const categoryDeleteApi = async (id, token) => {
  
  const config = {
    headers: {
      'Content-type': 'application/json',
      authorization: token,
    },
  };
  axios.delete('/category', {'id':id}, config);
};


export const categoryUpdateApi = async (category, token) => {
  
  const body= JSON.stringify(category);

  const config = {
    headers: {
      'Content-type': 'application/json',
      authorization: token
    }
  };
  axios.patch('/category',body, config);
};