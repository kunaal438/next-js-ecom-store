import admin from "firebase-admin";

if(!admin.apps.length){
    const serviceAccountCred = JSON.parse(process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT);

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccountCred)
    })
}   

const adminAuth = admin.auth();

export { adminAuth };