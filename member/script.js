fetch('members.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('データの取得に失敗しました');
    }
    return response.json();
  })
  .then(data => {
    const container = document.getElementById('hall-of-fame');

    data.forEach(member => {
      const memberDiv = document.createElement('div');
      memberDiv.classList.add('member');

      memberDiv.innerHTML = `
        <div class="frame">
          <img src="${member.photo}" alt="${member.name}">
        </div>
        <div class="info">
          <h3>${member.name}</h3>
          <p class="title">${member.title}</p>
          <p class="quote">「${member.quote}」</p>
        </div>
      `;

      container.appendChild(memberDiv);
    });
  })
  .catch(error => {
    console.error('メンバー情報の読み込み中にエラーが発生しました:', error);
    const container = document.getElementById('hall-of-fame');
    container.innerHTML = `<p>データの読み込みに失敗しました。</p>`;
  });
