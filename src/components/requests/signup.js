export default async function signUpRequest (data){
    data["password2"] = data["password1"]
    return fetch('http://127.0.0.1:8000/api/v1/rest-auth/registration/', {
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
                const keys = Object.keys(data)
                return [false, data[keys[0]][0]]
              }
        }).catch((error) => {
            console.error('Error:', error);
            return [false, error]
        }) 
    });
}