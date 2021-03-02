export default async function profileRequest (username){
    console.log(username)
    return fetch(`http://127.0.0.1:8000/api/v1/publicProfile/${username}/`, {
        credentials: 'include'
    }).then((response) => { 
        return response.json().then((data) => {
            return [true, data]
        }).catch((error) => {
            console.error('Error:', error);
            return [false, error]
        }) 
    });
}