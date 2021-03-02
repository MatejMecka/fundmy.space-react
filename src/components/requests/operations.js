export default async function operationsRequest (){
    return fetch('http://127.0.0.1:8000/api/v1/operations/', {
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