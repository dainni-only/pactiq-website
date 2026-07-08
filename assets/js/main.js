/* ============================================================
   PACTIQ — main.js
   ============================================================ */

/* ── 1. 모바일 네비게이션 햄버거 ──────────────────────────────── */
(function () {
  const btn    = document.getElementById('nav-hamburger');
  const drawer = document.getElementById('nav-drawer');
  if (!btn || !drawer) return;

  btn.addEventListener('click', () => {
    const open = btn.classList.toggle('open');
    drawer.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
  });

  // 드로어 링크 클릭 시 닫기
  drawer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('open');
      drawer.classList.remove('open');
      btn.setAttribute('aria-expanded', false);
    });
  });
})();


/* ── 2. 스크롤 시 네비 그림자 ─────────────────────────────────── */
(function () {
  const nav = document.getElementById('nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 8
      ? '0 1px 16px rgba(0,0,0,.06)'
      : 'none';
  }, { passive: true });
})();


/* ── 3. 문의 폼 처리 ─────────────────────────────────────────── */
/*
  현재: 폼 제출 시 콘솔에 데이터를 출력합니다 (백엔드 연동 전).
  백엔드 연결 방법:
    - fetch() 아래 주석 처리된 코드를 활성화하고
      '/api/contact' 를 실제 엔드포인트로 교체하세요.
    - 또는 Formspree / EmailJS 등 서드파티를 사용할 경우
      해당 SDK 호출로 교체하면 됩니다.
*/
(function () {
  const form   = document.getElementById('contact-form');
  const msgEl  = document.getElementById('form-msg');
  if (!form || !msgEl) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form));
    console.log('[PACTIQ] 문의 폼 데이터:', data);   // 개발 중 확인용

    // ── 백엔드 연동 시 아래 주석을 해제하세요 ──────────────────
    // try {
    //   const res = await fetch('/api/contact', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data),
    //   });
    //   if (!res.ok) throw new Error(await res.text());
    //   showMsg('success', '메시지가 전송되었습니다. 곧 연락드리겠습니다.');
    //   form.reset();
    // } catch (err) {
    //   showMsg('error', '전송 중 오류가 발생했습니다. 이메일로 직접 보내주세요.');
    //   console.error(err);
    // }
    // ───────────────────────────────────────────────────────────

    // 임시 성공 처리 (백엔드 연동 전)
    showMsg('success', '메시지가 전달되었습니다. 빠른 시일 내에 연락드리겠습니다.');
    form.reset();
  });

  function showMsg(type, text) {
    msgEl.textContent  = text;
    msgEl.className    = 'form-msg ' + type;
    msgEl.style.display = 'block';
    setTimeout(() => { msgEl.style.display = 'none'; }, 5000);
  }
})();


/* ── 4. 활성 네비 링크 하이라이트 (스크롤 기반) ────────────────── */
(function () {
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks  = document.querySelectorAll('.nav-links a, .nav-drawer a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => {
          const href = a.getAttribute('href');
          const match = href === '#' + entry.target.id;
          a.style.color = match ? 'var(--ink)' : '';
          a.style.fontWeight = match ? '700' : '';
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(sec => observer.observe(sec));
})();
