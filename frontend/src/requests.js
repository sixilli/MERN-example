import axios from 'axios';

let linkBase = 'http://localhost:3000/api/users/'

export const getUsers = async () => {
    return axios.get('http://localhost:3000/api/users')
}

export const createUser = async () => {

}

export const patchUser = async (user) => {
    let link = linkBase + user._id
    return axios.patch(link, user)
}

export const deleteUser = async (id) => {

}