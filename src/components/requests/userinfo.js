export default async function userInfo (data){
    return fetch('http://127.0.0.1:8000/api/v1/rest-auth/user/', {
        credentials: 'include'
    }).then((response) => { 
        return response.json().then((data) => {
            console.log('Success:', data);
            if("pk" in data){
                return [true, data] 
              } else {
                return [false, data["detail"]]
              }
        }).catch((error) => {
            console.error('Error:', error);
            return [false, error]
        }) 
    });
}