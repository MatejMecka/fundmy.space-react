export default async function (username, data){
    return fetch(`http://127.0.0.1:8000/api/v1/publicProfile/${username}`, {
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