// import { config } from '@vue/test-utils'
// import user from '@/store/modules/user'

const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin',
    reputation: 6
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor',
    reputation: 6
  }
}

export default [
  {
    url: '/api/balance',
    type: 'get',
    response: config => {
      return {
        code: '200',
        msg: '',
        data: 2000000000000000000000000
      }
    }
  },
  {
    url: '/api/auth/signup',
    type: 'post',
    response: config => {
      const { username, password } = config.body
      return {
        code: '200',
        msg: 'success',
        data: null
      }
    }
  },
  // user login
  {
    url: 'api/auth/signin',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]
      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: '200',
        data: {
          id: 0,
          token: token['token'],
          username
        },
        msg: ''
      }
    }
  },
  {
    url: '/api/user/register',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]
      if (token) {
        return {
          code: 401,
          msg: 'already login'
        }
        return {
          code: '200',
          msg: 'success'
        }
      }
    }
  },

  // get user info
  {
    url: '/api/user/info\.*',
    type: 'get',
    response: config => {
      const { Authorization } = config.query
      const info = users[Authorization]
      // mock error
      // if (!info) {
      //   return {
      //     code: 50008,
      //     message: 'Login failed, unable to get user details.'
      //   }
      // }

      return {
        code: '200',
        data: users['admin-token']
      }
    }
  },

  // user logout
  {
    url: '/api/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: '200',
        data: 'success'
      }
    }
  }
]
