// notifications-badge.js
// استدعِه في أي صفحة بعد تسجيل الدخول لإظهار badge الإشعارات

import { db } from './firebase-config.js';
import {
    collection, query, where, onSnapshot, orderBy
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

/**
 * يضيف زر الإشعارات في الـ nav ويراقب العدد بشكل live
 * @param {string} uid - معرف المستخدم
 * @param {string} role - دور المستخدم (captain / super_admin)
 * @param {string[]} navIds - قائمة IDs للـ nav elements المطلوب إضافة الزر فيها
 */
export function initNotificationsBadge(uid, role, navIds = ['sidebarNav', 'mobileSidebarNav']) {
    // بناء رابط الإشعارات
    const linkHTML = `
        <a href="notifications.html" id="notifNavLink"
            class="flex items-center gap-3 p-3 rounded-lg transition text-sm hover:bg-white/10"
            style="color:var(--sidebar-text)">
            <div class="relative">
                <i class="fas fa-bell w-4"></i>
                <span id="notifNavBadge" class="hidden absolute -top-1 -left-1 bg-red-500 text-white text-[8px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center"></span>
            </div>
            الإشعارات
        </a>
    `;

    navIds.forEach(navId => {
        const nav = document.getElementById(navId);
        if (nav) nav.insertAdjacentHTML('beforeend', linkHTML);
    });

    // مراقبة الإشعارات غير المقروءة
    let q;
    if (role === 'super_admin') {
        q = query(collection(db, "notifications"), orderBy("createdAt", "desc"));
    } else {
        q = query(
            collection(db, "notifications"),
            where("targetId", "in", [uid, "all"]),
            orderBy("createdAt", "desc")
        );
    }

    onSnapshot(q, (snap) => {
        let unread = 0;
        snap.forEach(d => {
            const readBy = d.data().readBy || [];
            if (!readBy.includes(uid)) unread++;
        });

        document.querySelectorAll('#notifNavBadge').forEach(badge => {
            if (unread > 0) {
                badge.textContent = unread > 9 ? '9+' : unread;
                badge.classList.remove('hidden');
                badge.classList.add('flex');
            } else {
                badge.classList.add('hidden');
                badge.classList.remove('flex');
            }
        });
    });
}
