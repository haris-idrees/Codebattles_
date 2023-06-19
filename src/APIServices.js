
export default class APIServices {


  static getAllUsers() {
    return fetch('http://127.0.0.1:8000/users')
      .then(response => response.json())
      .then(data => {
        // Process the data or return it as-is
        return data;
      })
      .catch(error => {
        console.error('Error retrieving users:', error);
        throw error;
      });
  }

  static getAllPosts() {
    return fetch('http://127.0.0.1:8000/posts')
      .then(response => response.json())
      .then(data => {
        // Process the data or return it as-is
        return data;
      })
      .catch(error => {
        console.error('Error retrieving posts:', error);
        throw error;
      });
  }

  static getAllCompetitions() {
    return fetch('http://127.0.0.1:8000/comps')
      .then(response => response.json())
      .then(data => {
        // Process the data or return it as-is
        return data;
      })
      .catch(error => {
        console.error('Error retrieving competition:', error);
        throw error;
      });
  }

  static getCompbyID(comp_id, body) {
    return fetch(`http://127.0.0.1:8000/comps/${comp_id}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    }).then(resp => resp.json());
  }
  

  static getAllProblems() {
    return fetch('http://127.0.0.1:8000/problems')
      .then(response => response.json())
      .then(data => {
        // Process the data or return it as-is
        return data;
      })
      .catch(error => {
        console.error('Error retrieving problems:', error);
        throw error;
      });
  }

  static insertResult(competition_id, user_id, result) {
    const body = {
      competition_id: competition_id,
      user_id: user_id,
      result: result
    };

    return fetch(`http://127.0.0.1:8000/result/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
      .then(resp => resp.json());
  }


  static getUserPosts(user_id) {
    let url = 'http://127.0.0.1:8000/getpostsByUser/';
  
    if (user_id) {
      url += `?user_id=${user_id}`;
    }
  
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        // Process the data or return it as-is
        return data;
      })
      .catch(error => {
        console.error('Error retrieving posts:', error);
        throw error;
      });
  }

  static getUserResults(user_id) {
    let url = 'http://127.0.0.1:8000/get_result/';
  
    if (user_id) {
      url += `?user_id=${user_id}`;
    }
  
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        // Process the data or return it as-is
        return data;
      })
      .catch(error => {
        console.error('Error retrieving posts:', error);
        throw error;
      });
  }

  static LoginUser(body) {
    return fetch(`http://127.0.0.1:8000/logincheck/`, {
      'method': 'POST',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify(body)

    }).then(resp => resp.json())
  }   

  static UpdateUser(user_id, body) {
    return fetch(`http://127.0.0.1:8000/users/${user_id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    }).then(resp => resp.json());
  }

  
  
  static LoginAdmin(body)
  {
    return fetch(`http://127.0.0.1:8000/login_admin/`, {
      'method': 'POST',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify(body)

    }).then(resp => resp.json())
  }

  static DeleteUser(user_id) {
    return fetch(`http://127.0.0.1:8000/users/${user_id}/`, {
      'method': 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
  }

  static insertUser(body) {
    return fetch(`http://127.0.0.1:8000/my_view/`, {
      'method': 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)

    }).then(resp => resp.json())
  }

  static insertPost(body) {
    return fetch(`http://127.0.0.1:8000/posts/`, {
      'method': 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)

    }).then(resp => resp.json())
  }
}