import axios from 'axios';

let linkBase = 'http://localhost:3000/api/users/'

export const getUsers = async () => {
    return axios.get('http://localhost:3000/api/users')
}

export const createUser = async (user) => {
    return axios.post('http://localhost:3000/api/users', user)
}

export const patchUser = async (user) => {
    let link = linkBase + user._id
    return axios.patch(link, user)
}

export const deleteUser = async (user) => {
    let link = linkBase + user._id
    return axios.delete(link, user)
}