const postList = document.getElementById("post-list");
let posts = [];

const saved = localStorage.getItem("posts");
if (saved) {
  posts = JSON.parse(saved);
}

// 글 등록
function addPost() {
  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();

  if (!title || !content) {
    alert("제목과 내용을 입력해주세요.");
    return;
  }

  const newPost = { title, content };
  posts.unshift(newPost);

  document.getElementById("title").value = "";
  document.getElementById("content").value = "";

  savePosts();
  
}

// 글 저장
function savePosts() {
  localStorage.setItem("posts", JSON.stringify(posts));
}

// 글 삭제
function deletePost(index) {
  if (confirm("삭제한 내역은 되돌릴 수 없습니다. 정말 삭제하시겠습니까?")) {
    posts.splice(index, 1);
    savePosts();
    renderPosts();
  }
}

// 글 수정
function editPost(index) {
  const newTitle = prompt("새 제목을 입력하세요", posts[index].title);
  const newContent = prompt("새 내용을 입력하세요", posts[index].content);

  if (newTitle !== null && newContent !== null) {
    posts[index].title = newTitle.trim();
    posts[index].content = newContent.trim();
    savePosts();
    renderPosts();
  }
}

// 내용 보기 토글
function toggleContent(index) {
  const contents = document.querySelectorAll(".post-content");
  const el = contents[index];
  el.style.display = el.style.display === "block" ? "none" : "block";
}

// 글 목록 렌더링
function renderPosts() {
  postList.innerHTML = "";

  posts.forEach((post, index) => {
    const postEl = document.createElement("div");
    postEl.className = "post-item";

    const titleEl = document.createElement("div");
    titleEl.innerText = post.title;
    titleEl.className = "post-title";
    titleEl.style.cursor = "pointer";
    titleEl.onclick = () => toggleContent(index);

    const contentEl = document.createElement("div");
    contentEl.innerText = post.content;
    contentEl.className = "post-content";
    contentEl.style.display = "none";

    postEl.appendChild(titleEl);
    postEl.appendChild(contentEl);

    // index.html에서만 수정/삭제 버튼 보여주기
    if (location.pathname.includes("index.html")) {
      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "삭제";
      deleteBtn.style.marginRight = "5px";
      deleteBtn.onclick = () => deletePost(index);

      const editBtn = document.createElement("button");
      editBtn.innerText = "수정";
      editBtn.onclick = () => editPost(index);

      postEl.appendChild(deleteBtn);
      postEl.appendChild(editBtn);
    }

    postList.appendChild(postEl);
  });
}

// 페이지 로드시 글 목록 불러오기
window.onload = function () {
  renderPosts();
};
