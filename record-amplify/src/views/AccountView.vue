<script setup lang="ts">
import { reactive } from 'vue';
import { Auth } from 'aws-amplify';
import { useUserStore } from '@/stores/user';

// interface
interface State {
  show_password_old: boolean;
  show_password_new: boolean;
  text: {
    username: String;
  };
  model: {
    text_field: {
      email: string;
      email_verification_code: string;
      password_old: string;
      password_new: string;
    };
  };
  disabled: {
    btn: {
      update_email: boolean;
      send_email_verification_code: boolean;
      request_resend_email_verification_code: boolean;
      change_password: boolean;
    };
  };
  show: {
    alert: {
      success: {
        update_email: boolean;
        change_password: boolean;
      };
      info: {
        sent_email_verification_code: boolean;
        sent_email_verification_code_again: boolean;
      };
      warning: {
        email_not_verified_yet: boolean;
      };
      error: {
        request_resend_email_verification_code: boolean;
        mismatch_email_verification_code: boolean;
        update_email: boolean;
        incorrect_password: boolean;
        change_password: boolean;
      };
    };
    form: {
      change_password: boolean;
    };
    form$btn: {
      email_verification_code: boolean;
    };
  };
}

// UserStore setting
const userstore = useUserStore();
// state setting
const state: State = reactive<State>({
  show_password_new: false,
  show_password_old: false,
  text: {
    username: userstore.username,
  },
  model: {
    text_field: {
      email: userstore.email,
      email_verification_code: '',
      password_new: '',
      password_old: '',
    },
  },
  disabled: {
    btn: {
      update_email: false,
      send_email_verification_code: false,
      request_resend_email_verification_code: false,
      change_password: false,
    },
  },
  show: {
    alert: {
      success: {
        update_email: false,
        change_password: false,
      },
      info: {
        sent_email_verification_code: false,
        sent_email_verification_code_again: false,
      },
      warning: {
        email_not_verified_yet: !userstore.email_verified,
      },
      error: {
        request_resend_email_verification_code: false,
        mismatch_email_verification_code: false,
        update_email: false,
        incorrect_password: false,
        change_password: false,
      },
    },
    form$btn: {
      email_verification_code: !userstore.email_verified,
    },
    form: {
      change_password: false,
    },
  },
});
// method setting
async function updateEmail(): Promise<void> {
  state.disabled.btn.update_email = true;
  state.show.alert.info.sent_email_verification_code =
    state.show.alert.warning.email_not_verified_yet =
    state.show.form$btn.email_verification_code =
    state.show.alert.info.sent_email_verification_code_again =
    state.show.alert.error.request_resend_email_verification_code =
    state.show.alert.error.mismatch_email_verification_code =
    state.show.alert.success.update_email =
    state.show.alert.error.update_email =
      false;
  try {
    const user = await Auth.currentAuthenticatedUser();
    const result = await Auth.updateUserAttributes(user, {
      email: state.model.text_field.email,
    });
    if (result === 'SUCCESS') {
      state.show.alert.info.sent_email_verification_code = true;
      state.show.form$btn.email_verification_code = true;
      userstore.email = state.model.text_field.email;
      userstore.email_verified = false;
    } else {
      throw Error(result);
    }
  } catch (e) {
    console.error(e);
    state.show.alert.error.update_email = true;
  } finally {
    state.disabled.btn.update_email = false;
  }
}
async function sendEmailVerificationCode(): Promise<void> {
  state.disabled.btn.send_email_verification_code = true;
  state.show.alert.success.update_email =
    state.show.alert.error.update_email =
    state.show.alert.error.mismatch_email_verification_code =
      false;
  try {
    const result = await Auth.verifyCurrentUserAttributeSubmit(
      'email',
      state.model.text_field.email_verification_code
    );
    if (result === 'SUCCESS') {
      state.show.alert.success.update_email = true;
      userstore.email_verified = true;
      state.show.form$btn.email_verification_code =
        state.show.alert.info.sent_email_verification_code =
        state.show.alert.info.sent_email_verification_code_again =
        state.show.alert.error.request_resend_email_verification_code =
        state.show.alert.warning.email_not_verified_yet =
          false;
    } else {
      throw Error(result);
    }
  } catch (e) {
    if (e instanceof Error && e.name === 'CodeMismatchException') {
      state.show.alert.error.mismatch_email_verification_code = true;
    } else {
      console.error(e);
      state.show.alert.error.update_email;
    }
  } finally {
    state.disabled.btn.send_email_verification_code = false;
  }
}
async function requestResendVerificationCode(): Promise<void> {
  state.disabled.btn.request_resend_email_verification_code = true;
  state.show.alert.info.sent_email_verification_code_again = false;
  state.show.alert.error.request_resend_email_verification_code = false;
  try {
    await Auth.verifyCurrentUserAttribute('email');
    state.show.alert.info.sent_email_verification_code_again = true;
  } catch (e) {
    console.error(e);
    state.show.alert.error.request_resend_email_verification_code = true;
  } finally {
    state.disabled.btn.request_resend_email_verification_code = false;
  }
}
function closeChangePasswordForm(): void {
  state.model.text_field.password_old = '';
  state.model.text_field.password_new = '';
  state.show_password_old = false;
  state.show_password_new = false;
  state.show.form.change_password = false;
}
async function changePassword(): Promise<void> {
  state.disabled.btn.change_password = true;
  state.show.alert.success.change_password =
    state.show.alert.error.incorrect_password =
    state.show.alert.error.change_password =
      false;
  try {
    const user = await Auth.currentAuthenticatedUser();
    const result = await Auth.changePassword(
      user,
      state.model.text_field.password_old,
      state.model.text_field.password_new
    );
    if (result === 'SUCCESS') {
      state.show.alert.success.change_password = true;
      state.show.form.change_password = false;
      state.model.text_field.password_old = '';
      state.model.text_field.password_new = '';
      state.show_password_old = false;
      state.show_password_new = false;
    } else {
      throw Error(result);
    }
  } catch (e) {
    if (e instanceof Error && e.name === 'NotAuthorizedException') {
      state.show.alert.error.incorrect_password = true;
    } else {
      console.error(e);
      state.show.alert.error.change_password = true;
    }
  } finally {
    state.disabled.btn.change_password = false;
  }
}
</script>
<template>
  <v-card class="mx-auto my-12" max-width="500" variant="outlined">
    <v-card-title>Edit Account</v-card-title>
    <v-card-actions>
      <v-container class="pa-1">
        <!-- username -->
        <div class="text-subtitle-1 mx-1 mb-1">Username</div>
        <div class="text-body-1 ml-4">{{ state.text.username }}</div>
        <!-- email -->
        <div class="text-subtitle-1 mx-1 my-3">Edit email</div>
        <v-form>
          <v-row>
            <v-col cols="9">
              <v-text-field
                v-model="state.model.text_field.email"
                label="Email"
                density="compact"
                variant="outlined"
                clearable
                hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col cols="3" class="pl-0 d-flex justify-center align-center">
              <v-btn
                @click="updateEmail"
                :disabled="state.disabled.btn.update_email"
                variant="outlined"
              >
                Submit
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
        <!-- email has not been verified yet -->
        <v-alert
          type="warning"
          v-show="state.show.alert.warning.email_not_verified_yet"
          density="compact"
          class="my-2"
          variant="outlined"
        >
          E-mail がまだ検証されていません．verificationemail.com からのメールに記載されている検証コードを次のフォームに入力してください．
        </v-alert>
        <!-- we sent email varification code -->
        <v-alert
          type="info"
          v-show="state.show.alert.info.sent_email_verification_code"
          density="compact"
          class="my-2"
          variant="outlined"
        >
          検証コードを E-mail に送信しました．verificationemail.com からのメールに記載されている検証コードを次のフォームに入力してください．
        </v-alert>
        <!-- email varification code -->
        <v-form v-show="state.show.form$btn.email_verification_code">
          <v-row>
            <v-col cols="9">
              <v-text-field
                v-model="state.model.text_field.email_verification_code"
                label="Verification Code"
                density="compact"
                variant="outlined"
                hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col cols="3" class="pl-0 d-flex justify-center align-center">
              <v-btn
                @click="sendEmailVerificationCode"
                :disabled="state.disabled.btn.send_email_verification_code"
                variant="outlined"
              >
                Submit
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
        <!-- request resend varification code -->
        <v-btn
          @click="requestResendVerificationCode"
          variant="outlined"
          block
          size="small"
          class="my-2 mx-0"
          v-show="state.show.form$btn.email_verification_code"
          :disabled="state.disabled.btn.request_resend_email_verification_code"
        >
          検証コードの再送
        </v-btn>
        <!-- sent the code again -->
        <v-alert
          type="info"
          density="compact"
          class="my-2"
          variant="outlined"
          v-show="state.show.alert.info.sent_email_verification_code_again"
        >
          検証コードを再送しました．
        </v-alert>
        <!-- An error occurred while requesting resend the code -->
        <v-alert
          type="error"
          density="compact"
          class="my-2"
          variant="outlined"
          v-show="state.show.alert.error.request_resend_email_verification_code"
        >
          証コードのリクエスト中にエラーが発生しました
        </v-alert>
        <!-- the code you input is not match -->
        <v-alert
          type="error"
          v-show="state.show.alert.error.mismatch_email_verification_code"
          density="compact"
          class="my-2"
          variant="outlined"
        >
          検証コードが一致しません．
        </v-alert>
        <!-- the email updated -->
        <v-alert
          type="success"
          v-show="state.show.alert.success.update_email"
          density="compact"
          class="my-2"
          variant="outlined"
        >
          E-mail を更新しました．
        </v-alert>
        <!-- An error occurred while updating the email -->
        <v-alert
          type="error"
          v-show="state.show.alert.error.update_email"
          density="compact"
          class="my-2"
          variant="outlined"
        >
          -mail の更新中にエラーが発生しました．
        </v-alert>
        <!-- password -->
        <div class="text-subtitle-1 mx-1 my-3">Edit password</div>
        <!-- change password btn -->
        <v-btn
          @click="state.show.form.change_password = true"
          variant="outlined"
          block
          class="my-2 mx-0"
          v-show="!state.show.form.change_password"
        >
          change password
        </v-btn>
        <v-btn
          block
          variant="outlined"
          @click="closeChangePasswordForm"
          class="my-2 mx-0"
          v-show="state.show.form.change_password"
        >
          Cancel
        </v-btn>
        <!-- change password form -->
        <v-form v-show="state.show.form.change_password">
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="state.model.text_field.password_old"
                :append-icon="state.show_password_old ? 'mdi-eye' : 'mdi-eye-off'"
                :type="state.show_password_old ? 'text' : 'password'"
                density="compact"
                variant="outlined"
                hide-details="auto"
                label="Old Password"
                hint="At least 8 characters"
                counter
                @click:append="state.show_password_old = !state.show_password_old"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="state.model.text_field.password_new"
                :append-icon="state.show_password_new ? 'mdi-eye' : 'mdi-eye-off'"
                :type="state.show_password_new ? 'text' : 'password'"
                density="compact"
                variant="outlined"
                hide-details="auto"
                label="New Password"
                hint="At least 8 characters"
                counter
                @click:append="state.show_password_new = !state.show_password_new"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="9"></v-col>
            <v-col cols="3" class="pl-0 d-flex justify-center align-center">
              <v-btn
                variant="outlined"
                @click="changePassword"
                :disabled="state.disabled.btn.change_password"
              >
                Submit
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
        <!-- the password updated -->
        <v-alert
          type="success"
          v-show="state.show.alert.success.change_password"
          density="compact"
          class="my-2"
          variant="outlined"
        >
          Password を変更しました．
        </v-alert>
        <!-- incorrect password -->
        <v-alert
          type="error"
          v-show="state.show.alert.error.incorrect_password"
          density="compact"
          class="my-2"
          variant="outlined"
        >
          Old Password が違います．
        </v-alert>
        <!-- An error occurred while updating the password -->
        <v-alert
          type="error"
          v-show="state.show.alert.error.change_password"
          density="compact"
          class="my-2"
          variant="outlined"
        >
          Password の変更中にエラーが発生しました．
        </v-alert>
      </v-container>
    </v-card-actions>
  </v-card>
</template>
