<template>
  <div class="flex h-full items-center justify-center">
    <div class="w-[1166px] max-w-full flex flex-col items-start justify-center gap-8">
      <div>
        <ItemShipLogo />
      </div>
      <div class="flex flex-row items-start justify-center w-full gap-[13.5%] unis-body-3">
        <form @submit.prevent="submit" class="flex flex-col gap-10 w-full min-w-[400px]">
          <div>
            <span class="unis-headline-1"> Sign in </span>
          </div>
          <div class="flex flex-col items-start gap-4">
            <ValidTextInput
              id="user-email"
              v-model="formData.username"
              class-list="w-full"
              type="email"
              label="Email"
              :validate="() => validateField('username')"
              :errors="validateErrors['username']"
            />
            <ValidTextInput
              id="user-password"
              v-model="formData.password"
              class-list="w-full"
              :type="passwordType"
              label="Password"
              :validate="() => validateField('password')"
              :errors="validateErrors['password']"
              ><template v-slot:trailing>
                <EyeIcon
                  class="h-6 w-6"
                  v-show="passwordType === 'text'"
                  @click="changePasswordType"
                ></EyeIcon>
                <EyeSlashIcon
                  class="h-6 w-6"
                  v-show="passwordType === 'password'"
                  @click="changePasswordType"
                ></EyeSlashIcon>
              </template>
            </ValidTextInput>
            <div class="flex flex-row justify-between w-full items-center">
              <div class="flex flex-row justify-between items-center"></div>
              <a class="text-purple-300 cursor-pointer">Forgot password?</a>
            </div>
          </div>

          <button class="w-full unis-btn-filled h-12" v-if="!signInLoading">Sign in</button>

          <button type="button" class="!bg-sky-600 unis-btn-filled w-full h-12" v-else>
            <svg
              aria-hidden="true"
              role="status"
              class="inline w-4 h-4 mr-3 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
            Loading...
          </button>

          <div class="flex items-center gap-1 self-stretch text-gray-300">
            <div class="bg-gray-300 h-[1px] w-full"></div>
            <div>OR</div>
            <div class="bg-gray-300 h-[1px] w-full"></div>
          </div>
          <div class="m-auto mt-[20px]">
            Don't have an account?&nbsp;
            <span class="text-purple-300 cursor-pointer"> Sign up </span>
          </div>
          <div class="flex text-gray-300 justify-center">Copyright © Item Ship 2024</div>
        </form>
        <div
          style="flex-basis: 140%"
          class="w-full ha-full flex flex-col items-center justify-center"
        >
          <img src="@assets/login_truck.png" alt="Truck" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
import * as yup from 'yup'
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'
import ItemShipLogo from '@assets/ItemShipLogo.vue'
import ValidTextInput from '@/components/ValidTextInput.vue'
import { validationHelper } from '@/utils/validationHelper'

const signInLoading = ref(false)
const passwordType = ref('password')
const formData = reactive({
  username: '',
  password: ''
})
const schema = yup.object({
  username: yup.string().required('email is required').email(),
  password: yup
    .string()
    .required('password is required')
    .min(8, 'password must be at least 8 characters')
    .max(20, 'password must be at most 20 characters')
    .matches(/[A-Z]/, 'password must contain at least one uppercase character')
    .matches(/[a-z]/, 'password must contain at least one lowercase character')
    .matches(/[0-9]/, 'password must contain at least one number')
})
const { validateField, validateForm, validateErrors, isFormValid } = validationHelper(
  schema,
  formData
)

// const changeTheme = () => {
// 	const rootElement = document.documentElement;
// 	rootElement.classList.toggle('dark');
// 	localStorage.setItem('theme', rootElement.classList.contains('dark') ? 'dark' : 'light');
// };
const counter = ref(0)
async function submit() {
  console.log('submitting', counter.value++)
  await validateForm()
  if (isFormValid()) {
    console.log('form is valid')
    signIn()
  } else {
    console.log('form is invalid', validateErrors)
  }
}

const signIn = () => {
  console.log('signIn called')

  const signInParams = {
    username: formData.username,
    password: formData.password,
    channel: 'Web'
  }
  signInLoading.value = true
  //loginApi.signInAsPromise(signInParams).then(
  console.log('pass these params to sign in call:', signInParams)
}

const changePasswordType = () => {
  passwordType.value = passwordType.value === 'password' ? 'text' : 'password'
}
</script>
