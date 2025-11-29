function navigateTo(sectionId) {
    // Esconde todas as seções
    document.querySelectorAll('.page').forEach((page) => {
      page.classList.remove('active');
    });
  
    // Mostra a seção selecionada
    const targetPage = document.getElementById(sectionId);
    if (targetPage) {
      targetPage.classList.add('active');
    }
  }
  
// Enviar o formulário de contato (com integração ao backend)
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async function (event) {
      event.preventDefault();
  
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
  
      try {
        const response = await fetch('http://localhost:3000/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, message }),
        });
  
        if (response.ok) {
          alert('Mensagem enviada com sucesso!');
          document.getElementById('contactForm').reset();
        } else {
          const result = await response.json();
          alert(result.message || 'Erro ao enviar a mensagem.');
        }
      } catch (error) {
        console.error('Erro ao enviar a mensagem:', error);
        alert('Erro ao enviar a mensagem. Verifique sua conexão.');
      }
    });
  }
});

  // Processar registro
document.getElementById('registerForm').addEventListener('submit', async function (event) {
    event.preventDefault();
  
    const username = document.getElementById('username').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
  
    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert('Registro realizado com sucesso! Faça login para continuar.');
        navigateTo('login'); // Redirecionar para a página de login
      } else {
        alert(result.message || 'Erro ao registrar');
      }
    } catch (error) {
      console.error('Erro durante o registro:', error);
      alert('Erro de conexão com o servidor.');
    }
  });
  
  // Obter taxas de câmbio
async function loadExchangeRates() {
    try {
      const response = await fetch('http://localhost:3000/api/currencies/list', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      const rates = await response.json();
  
      if (response.ok) {
        const tableBody = document.getElementById('exchangeRates');
        tableBody.innerHTML = '';
  
        rates.forEach(rate => {
          tableBody.innerHTML += `
            <tr>
              <td>${rate.currency}</td>
              <td>${rate.rate}</td>
              <td>
                <button class="btn btn-primary btn-sm" onclick="initiateExchange('${rate.currency}', ${rate.rate})">
                  Trocar
                </button>
              </td>
            </tr>`;
        });
      } else {
        alert('Erro ao carregar taxas de câmbio.');
      }
    } catch (error) {
      console.error('Erro ao carregar taxas:', error);
      alert('Erro de conexão com o servidor.');
    }
  }
  
  // Iniciar transação de troca
  async function initiateExchange(currency, rate) {
    const amount = prompt(`Digite o valor que deseja trocar em ${currency}:`);
  
    if (!amount) return;
  
    try {
      const response = await fetch('http://localhost:3000/api/transactions/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ currency, amount, rate }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert('Troca iniciada com sucesso!');
      } else {
        alert(result.message || 'Erro ao iniciar troca.');
      }
    } catch (error) {
      console.error('Erro ao iniciar troca:', error);
      alert('Erro de conexão com o servidor.');
    }
  }
  // Navegação dinâmica
/*function navigateTo(sectionId) {
  fetch(`${sectionId}.html`)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById('content').innerHTML = html;
      highlightNavItem(sectionId);
    })
    .catch((error) => console.error(`Erro ao carregar a seção ${sectionId}:`, error));
}*/
function navigateTo(sectionId) {
  document.querySelectorAll('.page').forEach((page) => {
    page.classList.remove('active');
  });
  const targetPage = document.getElementById(sectionId);
  if (targetPage) {
    targetPage.classList.add('active');
  }
}

// Destacar item ativo no menu
function highlightNavItem(sectionId) {
  document.querySelectorAll('#navbar .nav-link').forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('onclick') === `navigateTo('${sectionId}')`) {
      link.classList.add('active');
    }
  });
}
// Obter taxas de câmbio
async function loadExchangeRates() {
  try {
      const response = await fetch('http://localhost:3000/api/currencies/list', {
          headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
      });
      const rates = await response.json();
      if (response.ok) {
          const tableBody = document.getElementById('exchangeRates');
          tableBody.innerHTML = '';
          rates.forEach(rate => {
              tableBody.innerHTML += `
                  <tr>
                      <td>${rate.currency}</td>
                      <td>${rate.rate}</td>
                      <td>
                          <button class="btn btn-primary btn-sm" onclick="initiateExchange('${rate.currency}', ${rate.rate})">Trocar</button>
                      </td>
                  </tr>`;
          });
      } else {
          alert('Erro ao carregar taxas de câmbio.');
      }
  } catch (error) {
      console.error('Erro ao carregar taxas:', error);
      alert('Erro de conexão com o servidor.');
  }
}

// Função para trocar divisas
async function initiateExchange(currency, rate) {
  const amount = prompt(`Digite o valor que deseja trocar em ${currency}:`);
  if (!amount) return;
  try {
      const response = await fetch('http://localhost:3000/api/transactions/initiate', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ currency, amount, rate })
      });
      const result = await response.json();
      if (response.ok) {
          alert('Troca iniciada com sucesso!');
      } else {
          alert(result.message || 'Erro ao iniciar troca.');
      }
  } catch (error) {
      console.error('Erro ao iniciar troca:', error);
      alert('Erro de conexão com o servidor.');
  }
}

// Função para registrar um usuário
document.getElementById('registerForm').addEventListener('submit', async function (event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;
  try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, email, password })
      });
      const result = await response.json();
      if (response.ok) {
          alert('Registro realizado com sucesso! Faça login para continuar.');
          navigateTo('login');
      } else {
          alert(result.message || 'Erro ao registrar.');
      }
  } catch (error) {
      console.error('Erro durante o registro:', error);
      alert('Erro de conexão com o servidor.');
  }
});

// Função para enviar mensagens de contato
/*document.getElementById('contactForm').addEventListener('submit', async function (event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  try {
      const response = await fetch('http://localhost:3000/api/contact', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, message })
      });
      if (response.ok) {
          alert('Mensagem enviada com sucesso!');
          document.getElementById('contactForm').reset();
      } else {
          alert('Erro ao enviar a mensagem.');
      }
  } catch (error) {
      console.error('Erro ao enviar a mensagem:', error);
      alert('Erro ao enviar a mensagem.');
  }
});*/
document.getElementById('contactForm')?.addEventListener('submit', async function (event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  try {
    const response = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    });
    if (response.ok) {
      alert('Mensagem enviada com sucesso!');
    } else {
      alert('Erro ao enviar mensagem.');
    }
  } catch (error) {
    console.error('Erro:', error);
  }
});



// Animação de fade-in
document.addEventListener('DOMContentLoaded', () => {
  gsap.from('#content', { opacity: 50, duration: 3, y: 90 });
  navigateTo('home');
});


/*// Carregar a seção inicial
document.addEventListener('DOMContentLoaded', () => {
  navigateTo('home');
});
*/
  