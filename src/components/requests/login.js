export default async function loginRequest (data){
    return fetch('http://127.0.0.1:8000/api/v1/rest-auth/login/', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => { 
        return response.json().then((data) => {
            console.log('Success:', data);
            if("token" in data){
                return [true, data["token"]] 
              } else {
                return [false, data["non_field_errors"][0]]
              }
        }).catch((error) => {
            console.error('Error:', error);
            return [false, error]
        }) 
    });
}