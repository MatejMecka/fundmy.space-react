export default async function balancesRequest (){
    return fetch('http://127.0.0.1:8000/api/v1/balances/', {
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