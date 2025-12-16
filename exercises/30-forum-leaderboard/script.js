console.log('fCC Forum Leaderboard');

const forumLatest =
  'https://cdn.freecodecamp.org/curriculum/forum-latest/latest.json';
const forumTopicUrl = 'https://forum.freecodecamp.org/t/';
const forumCategoryUrl = 'https://forum.freecodecamp.org/c/';
const avatarUrl = 'https://cdn.freecodecamp.org/curriculum/forum-latest';

const postsContainer = document.getElementById('posts-container');

const allCategories = {
  299: { category: 'Career Advice', className: 'career' },
  409: { category: 'Project Feedback', className: 'feedback' },
  417: { category: 'freeCodeCamp Support', className: 'support' },
  421: { category: 'JavaScript', className: 'javascript' },
  423: { category: 'HTML - CSS', className: 'html-css' },
  424: { category: 'Python', className: 'python' },
  432: { category: 'You Can Do This!', className: 'motivation' },
  560: { category: 'Backend Development', className: 'backend' },
};

async function fetchData() {
  try {
    const res = await fetch(forumLatest);
    const data = await res.json();

    console.log('Data:', data);
    showLatestPosts(data);
  } catch (err) {
    console.error('Errors:', err);
  }
}

fetchData();

const timeAgo = (time) => {
  const currTime = new Date();
  const oldTime = new Date(time);
  const diffMs = currTime - oldTime;
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diffMs / (1000 * 60)) % 60);
  const period =
    days > 0 ? days + 'd ago' : hours > 0 ? hours + 'h ago' : mins + 'm ago';
  return period;
};

const viewCount = (num) => {
  const result = num >= 1000 ? Math.floor(num / 1000) + 'k' : num;
  return result;
};

const forumCategory = (categoryId) => {
  if (!Object.hasOwn(allCategories, categoryId)) {
    return `<a class="category general" href="${forumCategoryUrl}general/${categoryId}">General</a>`;
  }
  const { category, className } = allCategories[categoryId];
  return `<a class="category ${className}" href="${forumCategoryUrl}${className}/${categoryId}">${category}</a>`;
};

const avatars = (posters, users) => {
  return posters
    .map((poster) => {
      const user = users.find((u) => u.id === poster.user_id);
      return user
        ? `<img src='${avatarUrl}${user.avatar_template.replace('{size}', 30)}' alt='${user.name}' width='30' height="30"/>\n`
        : '';
    })
    .join('');
};

const showLatestPosts = (obj) => {
  let html = '';
  const topicsArr = obj.topic_list.topics;
  topicsArr.forEach((topic) => {
    html += `<tr>
    <td>
    <a class='post-title' href='${forumTopicUrl}${topic.slug}/${topic.id}'>${topic.title}</a>
    ${forumCategory(topic.category_id)}
    </td>
    <td><div class='avatar-container'>${avatars(topic.posters, obj.users)}</div></td>
    <td>${topic.posts_count - 1}</td>
    <td>${viewCount(topic.views)}</td>
    <td>${timeAgo(topic.bumped_at)}</td>
    </tr>`;
  });
  postsContainer.innerHTML = html;
};
