$(document).ready(function() {
  // console.log('Ready...');
  $('.userSearch').on('keyup', function(e) {
    // console.log('key pressed');
    let username = e.target.value;

    //Make request to GitHub
    $.ajax({
      url: 'https://api.github.com/users/' + username,
      data: {
        client_id: '1971462411792b9f85b9',
        client_secret: '0c22105b4d9ec0af039fbe5f4dc71cdc760eaa07'
      }
    }).done(function(user) {
      // console.log(user);
      $.ajax({
        url: 'https://api.github.com/users/' + username + '/repos',

        data: {
          client_id: '1971462411792b9f85b9',
          client_secret: '0c22105b4d9ec0af039fbe5f4dc71cdc760eaa07',
          sort: 'created: asc',
          per_page: 5
        }
      }).done(function(repos) {
        // console.log(repos);
        $.each(repos, function(index, repo) {
          $('#repos').append(`
            <div class="repo">
              <a href="${repo.html_url}" target="_blank">${repo.name}</a>
          
              <div class="pills">
                <span class="badge"><b>Stars:</b> ${repo.stargazers_count}</span>
                <span class="badge"><b>Watchers:</b> ${repo.watchers_count}</span>
                <span class="badge"><b>Forks:</b> ${repo.forks_count}</span>
              </div>
            </div>
          `);
        });
      });
      $('#profile').html(`
        <!-- GRID -->
        <div class="grid">
          <div class="profile">
            <img src="${user.avatar_url}" alt="profile" class="img" />
            <a href="${user.html_url}" target="_blank" class="btn">View Profile</a>
          </div>
          <div class="cards">
            <span class="badge">Public Repos: ${user.public_repos}</span>
            <span class="badge">Followers: ${user.followers}</span>
            <span class="badge">Following: ${user.following}</span>

            <ul class="list-group">
              <li class="list-group-item">
                <b>Company:</b>
                <span class="list-group-item-result">${user.company}</span>
              </li>
              <li class="list-group-item">
                <b>Website:</b>
                <span class="list-group-item-result">${user.blog}</span>
              </li>
              <li class="list-group-item">
                <b>Location:</b>
                <span class="list-group-item-result">${user.location}</span>
              </li>
              <li class="list-group-item">
                <b>Member Since:</b>
                <span class="list-group-item-result">${user.created_at}</span>
              </li>
            </ul>
          </div>
        </div>
        <!-- GRID END -->

        <h3 class="page-heading">Latest Repos</h3>
        <div id="repos"></div>
      `);
    });
  });
});
