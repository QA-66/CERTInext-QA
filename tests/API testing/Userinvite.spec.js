const { test, expect, request } = require('@playwright/test');

test('Verify User Invitation API', async () => {
    const api = await request.newContext({
        baseURL: 'https://qa.certinext.io',
        storageState: './playwright/.auth/auth.json'
    });

    const payload = {
        emailSelectIDs: 'testuser@emudhra.com',
        approveUserCheckBox: '0',
        groupLimitCheckbox: '0',
        groupSelectIDs: '',
        roles: '',
        customRoleId: '0',
        invitationRemarks: '',
        timeZoneOffset: '+05:30',
        dummy: '26621259'
    };

    try {
        const response = await api.post('/UserInvitation/sendInvite', {
            form: payload
        });

        const result = await response.json();

        if (result.responseCode === '0') {
            console.log('Email ID already exists. User cannot be invited.');
        } else if (result.responseCode === '1') {
            console.log('Email ID does not exist. User invited successfully.');
        } else {
            console.log('Unexpected API response:', result);
        }

        expect(response.status()).toBe(200);
    } finally {
        await api.dispose();
    }

});

test('Verify user is able to Resend the invitation email', async () => {
 const apicontext=await request.newContext({
 baseURL: 'https://qa.certinext.io/',
 storageState: './playwright/.auth/auth.json',
 });
const reqpayload={

'invitationId':'Uxmk6sz2QVs=',
'dummy': '70506237'
}
const responsepayload= await apicontext.post('/UserInvitation/resend', {
    form : reqpayload
});
const result1 = await responsepayload.json();
console.log("Resend inivitation status is:",result1.responseMessage);
console.log("Resend invitation response code is:",result1.responseCode);
console.log("Resend invitation errorcode is:",result1.errorCode);
});

test('Verify user is able to create user with valid emailID', async()=>{

const Usercreateapi= await request.newContext({
baseURL: 'https://qa.certinext.io/',
storageState: './playwright/.auth/auth.json',

});
 const usercreatepayload= {

name: 'Testingone',
    email: 'Testingone@emudhra.com',
    isdCode: '',
    mobileNumber: '',
    tagNameArrayString: '{}',
    tagValueArrayString: '{}',
    employeeID: '',
    groupLimitCheckbox: '0',
    groupSelectIDs: '',
    customRole: '0',
    roles: '3',
    type: '1',
    timeZoneOffset: '+05:30',
    requestVerificationToken: '',
    dummy: '30303921'
    
 }
  const usercreateresponse=await Usercreateapi.post('ManageUsers/saveUser', {
  form: usercreatepayload,

  })
 expect(usercreateresponse.status()).toBe(200);
   const result3= await usercreateresponse.json();
  console.log("User creation status:",result3.responseMessage);
  console.log("User creation response code:",result3.responseCode);

if(result3.responseCode==='1'){
    console.log("User created successfully");
}
else if(result3.responseCode==='0'){
    console.log("User creation failed");
}
else{
    console.log("Unexpected API response:",result3);
}
});
