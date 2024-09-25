import { Alert, ToastAndroid } from 'react-native';
import { BaseUrl } from '../../../SRC/Utils/BaseUrl';
import ShowToast from '../../../SRC/Component/ShowToast';

export const UserDetailAction = (params) => {
    var formData = new FormData();
    formData.append('token', params.Token);
    return async dispatch => {
        if (params) {
            fetch(`${BaseUrl.base}/user-details`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${params.Token}`,
                },
            })
                .then((res) => res.json())
                .then((res) => {
                    if (res) {
                        dispatch({ type: 'user_detail', payload: res?.result });
                    } else if (res.error) {
                        dispatch({ type: 'user_detail', payload: res?.error });
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };
};