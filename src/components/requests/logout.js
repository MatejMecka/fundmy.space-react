export default async function logoutRequest (data){
    return fetch('http://127.0.0.1:8000/api/v1/rest-auth/logout/', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    }).then((response) => { 
        return response.json().then((data) => {
            console.log('Success:', data);
            if(data["detail"] == "Successfully logged out."){
                return [true, data["detail"]]
              } else {
                return [false, "There was an error"]
              }
        }).catch((error) => {
            console.error('Error:', error);
            return [false, error]
        }) 
    });
}