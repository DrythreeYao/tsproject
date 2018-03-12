import { constants } from '../core/ts/app';
import apiService from './api';

class PassportService {
  /**
   * 查询用户信息
   */
  getUserInfo() {
    return apiService.post('userinfo')
  }
  /**
   * 退出登录
   */
  exit() {
    return apiService.post('login/loginOut')
  }
}

export default new PassportService()
