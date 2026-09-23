const toast = document.querySelector(".toast");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2200);
}

/* ===== 커피챗 CTA 버튼 =====
 * 구글 폼 링크가 준비되면 각 버튼의 href 속성과 data-form-url 값을
 * 실제 폼 URL로 교체해주세요. href="#" 인 동안에는 클릭 시 안내 토스트만 표시됩니다.
 */
const coffeeChatButtons = document.querySelectorAll("[data-coffee-chat]");

coffeeChatButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const formUrl = button.dataset.formUrl;
    const href = button.getAttribute("href");
    const isPlaceholder = !formUrl && (!href || href === "#");

    if (isPlaceholder) {
      event.preventDefault();
      showToast("커피챗 신청 폼 링크는 준비 중이에요. 곧 연결할게요!");
    }
  });
});

/* ===== 스크롤 reveal 애니메이션 ===== */
const revealTargets = document.querySelectorAll("[data-reveal]");

if (reduceMotion.matches || !("IntersectionObserver" in window)) {
  revealTargets.forEach((el) => el.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -40px 0px" }
  );

  revealTargets.forEach((el) => observer.observe(el));
}
