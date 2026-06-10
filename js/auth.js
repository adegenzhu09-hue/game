import { auth, db } from './firebase-config.js';
import { 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

// Kiểm tra trạng thái đăng nhập
export function checkAuthState(callback) {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            // Lấy thông tin premium từ Firestore
            const userDoc = await getDoc(doc(db, "users", user.uid));
            const userData = userDoc.data();
            callback(user, userData?.premium || false);
        } else {
            callback(null, false);
        }
    });
}

// Cập nhật UI dựa trên trạng thái
checkAuthState((user, isPremium) => {
    const loginLink = document.getElementById('loginLink');
    const logoutBtn = document.getElementById('logoutBtn');
    const userDisplay = document.getElementById('userDisplay');
    const premiumLink = document.getElementById('premiumLink');

    if (user) {
        if (loginLink) loginLink.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'inline';
        if (userDisplay) userDisplay.innerText = `Xin chào, ${user.email}`;
        if (premiumLink) premiumLink.innerText = isPremium ? '⭐ Premium' : 'Nâng cấp';
    } else {
        if (loginLink) loginLink.style.display = 'inline';
        if (logoutBtn) logoutBtn.style.display = 'none';
        if (userDisplay) userDisplay.innerText = '';
    }
});

// Đăng xuất
document.getElementById('logoutBtn')?.addEventListener('click', () => {
    signOut(auth).then(() => window.location.reload());
});

// Hàm đăng nhập (dùng trong login.html)
export async function loginEmail(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}
export async function registerEmail(email, password) {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    // Tạo document user với premium = false
    await setDoc(doc(db, "users", userCred.user.uid), { premium: false });
    return userCred;
}
export async function loginGoogle() {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    // Kiểm tra nếu user mới thì tạo document
    const userDoc = await getDoc(doc(db, "users", result.user.uid));
    if (!userDoc.exists()) {
        await setDoc(doc(db, "users", result.user.uid), { premium: false });
    }
    return result;
}
