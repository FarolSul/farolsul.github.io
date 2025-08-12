// Sistema de Gestão Comercial - JavaScript
class SGC {
    constructor() {
        this.data = {
            clientes: [],
            representadas: [],
            produtos: [],
            pedidos: [],
            visitas: [],
            metricas: {}
        };
        this.currentDate = new Date();
        this.charts = {};
        this.currentPedidoItems = [];
        this.init();
    }

    init() {
        this.loadData();
        this.setupNavigation();
        this.setupModals();
        this.setupForms();
        this.setupFilters();
        this.renderDashboard();
        this.renderAllTables();
        this.setupCalendar();
        this.renderReports();
        this.showNotification('Sistema carregado com sucesso!', 'success');
    }

    // Data Management
    loadData() {
        const savedData = localStorage.getItem('sgc_data');
        if (savedData) {
            this.data = JSON.parse(savedData);
        } else {
            // Dados iniciais de exemplo
            this.data = {
                clientes: [
                    {
                        id: 1,
                        nome: "TechSolutions Ltda",
                        cnpj: "12.345.678/0001-90",
                        telefone: "(11) 3456-7890",
                        email: "contato@techsolutions.com.br",
                        endereco: "Rua das Flores, 123 - São Paulo/SP",
                        status: "ativo",
                        ultimaCompra: "2024-11-15",
                        cicloCompras: 45,
                        totalCompras: 25000
                    },
                    {
                        id: 2,
                        nome: "Móveis & Design",
                        cnpj: "98.765.432/0001-12",
                        telefone: "(41) 2345-6789", 
                        email: "vendas@moveisedesign.com.br",
                        endereco: "Av. Batel, 456 - Curitiba/PR",
                        status: "ativo",
                        ultimaCompra: "2024-10-20",
                        cicloCompras: 60,
                        totalCompras: 18000
                    },
                    {
                        id: 3,
                        nome: "Ferramentas Sul",
                        cnpj: "55.666.777/0001-33",
                        telefone: "(51) 9876-5432",
                        email: "compras@ferramentassul.com.br",
                        endereco: "Rua Industrial, 789 - Porto Alegre/RS",
                        status: "inativo",
                        ultimaCompra: "2024-08-10",
                        cicloCompras: 30,
                        totalCompras: 32000
                    }
                ],
                representadas: [
                    {
                        id: 1,
                        nome: "ElectronTech Brasil",
                        cnpj: "11.222.333/0001-44",
                        telefone: "(11) 1234-5678",
                        email: "comercial@electrontech.com.br",
                        comissao: 8.5,
                        produtos: ["Notebooks", "Tablets", "Acessórios"]
                    },
                    {
                        id: 2,
                        nome: "MadeiraNobre Móveis",
                        cnpj: "44.555.666/0001-77",
                        telefone: "(41) 8765-4321",
                        email: "vendas@madeiranobre.com.br",
                        comissao: 12.0,
                        produtos: ["Mesas", "Cadeiras", "Estantes"]
                    },
                    {
                        id: 3,
                        nome: "FerraBrasil Ltda",
                        cnpj: "77.888.999/0001-00",
                        telefone: "(51) 5555-1234",
                        email: "representante@ferrabrasil.com.br",
                        comissao: 10.0,
                        produtos: ["Furadeiras", "Parafusadeiras", "Serras"]
                    }
                ],
                produtos: [
                    {
                        id: 1,
                        codigo: "NB001",
                        descricao: "Notebook ElectronTech i7",
                        marca: "ElectronTech",
                        representada: "ElectronTech Brasil",
                        preco: 2500.00,
                        categoria: "Informática",
                        estoque: 25
                    },
                    {
                        id: 2,
                        codigo: "MES001",
                        descricao: "Mesa de Escritório Premium",
                        marca: "MadeiraNobre",
                        representada: "MadeiraNobre Móveis",
                        preco: 850.00,
                        categoria: "Móveis",
                        estoque: 15
                    },
                    {
                        id: 3,
                        codigo: "FUR001",
                        descricao: "Furadeira Impact Pro",
                        marca: "FerraBrasil",
                        representada: "FerraBrasil Ltda",
                        preco: 320.00,
                        categoria: "Ferramentas",
                        estoque: 40
                    }
                ],
                pedidos: [
                    {
                        id: 1,
                        cliente: "TechSolutions Ltda",
                        data: "2024-11-15",
                        status: "aprovado",
                        total: 5000.00,
                        comissao: 425.00,
                        itens: [
                            {produto: "Notebook ElectronTech i7", quantidade: 2, preco: 2500.00, desconto: 0}
                        ]
                    },
                    {
                        id: 2,
                        cliente: "Móveis & Design",
                        data: "2024-10-20",
                        status: "pendente",
                        total: 1700.00,
                        comissao: 204.00,
                        itens: [
                            {produto: "Mesa de Escritório Premium", quantidade: 2, preco: 850.00, desconto: 0}
                        ]
                    }
                ],
                visitas: [
                    {
                        id: 1,
                        cliente: "TechSolutions Ltda",
                        data: "2024-12-20",
                        horario: "14:00",
                        status: "agendada",
                        observacoes: "Apresentar novos produtos"
                    },
                    {
                        id: 2,
                        cliente: "Ferramentas Sul",
                        data: "2024-12-18",
                        horario: "09:30",
                        status: "agendada",
                        observacoes: "Reativar cliente - oferta especial"
                    }
                ],
                metricas: {
                    vendasMes: 23500.00,
                    pedidosPendentes: 8,
                    clientesAtivos: 25,
                    comissaoAReceber: 1850.00,
                    metaMensal: 50000.00
                }
            };
            this.saveData();
        }
    }

    saveData() {
        localStorage.setItem('sgc_data', JSON.stringify(this.data));
    }

    // Navigation
    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navMobile = document.getElementById('navMobile');

        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const section = e.target.getAttribute('data-section');
                console.log('Navigating to:', section); // Debug log
                this.showSection(section);
                
                // Update active states
                navItems.forEach(nav => nav.classList.remove('active'));
                document.querySelectorAll(`[data-section="${section}"]`).forEach(nav => nav.classList.add('active'));
                
                // Hide mobile menu
                navMobile.classList.remove('show');
            });
        });

        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                navMobile.classList.toggle('show');
            });
        }
    }

    showSection(sectionId) {
        console.log('Showing section:', sectionId); // Debug log
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            
            // Trigger specific rendering for certain sections
            if (sectionId === 'agenda') {
                this.renderCalendar();
            } else if (sectionId === 'relatorios') {
                this.renderReports();
            }
        } else {
            console.error('Section not found:', sectionId);
        }
    }

    // Modals
    setupModals() {
        // Make functions globally available
        window.openModal = (modalId) => {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.remove('hidden');
                if (modalId === 'pedidoModal') {
                    this.setupPedidoModal();
                }
                this.populateSelects();
            }
        };

        window.closeModal = (modalId) => {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('hidden');
                this.resetForm(modalId);
            }
        };

        // Close modal on backdrop click
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.add('hidden');
                }
            });
        });
    }

    resetForm(modalId) {
        const modal = document.getElementById(modalId);
        const form = modal.querySelector('form');
        if (form) form.reset();
        
        // Reset hidden ID fields
        const idField = modal.querySelector('input[type="hidden"]');
        if (idField) idField.value = '';
        
        // Reset pedido items table
        if (modalId === 'pedidoModal') {
            document.getElementById('pedidoItensTableBody').innerHTML = '';
            this.currentPedidoItems = [];
            this.updatePedidoTotals();
        }

        // Reset modal title
        const titleElement = modal.querySelector('.modal-header h3');
        if (titleElement) {
            const defaultTitles = {
                'clienteModal': 'Novo Cliente',
                'representadaModal': 'Nova Representada',
                'produtoModal': 'Novo Produto',
                'pedidoModal': 'Novo Pedido',
                'visitaModal': 'Nova Visita'
            };
            titleElement.textContent = defaultTitles[modalId] || 'Novo';
        }
    }

    // Forms
    setupForms() {
        // Cliente Form
        const clienteForm = document.getElementById('clienteForm');
        if (clienteForm) {
            clienteForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveCliente();
            });
        }

        // Representada Form
        const representadaForm = document.getElementById('representadaForm');
        if (representadaForm) {
            representadaForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveRepresentada();
            });
        }

        // Produto Form
        const produtoForm = document.getElementById('produtoForm');
        if (produtoForm) {
            produtoForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveProduto();
            });
        }

        // Pedido Form
        const pedidoForm = document.getElementById('pedidoForm');
        if (pedidoForm) {
            pedidoForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.savePedido();
            });
        }

        // Visita Form
        const visitaForm = document.getElementById('visitaForm');
        if (visitaForm) {
            visitaForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveVisita();
            });
        }

        // Add item to pedido button
        window.addItemToPedido = () => this.addItemToPedido();
        window.removeItemFromPedido = (button) => this.removeItemFromPedido(button);
    }

    // CRUD Operations - Clientes
    saveCliente() {
        const id = document.getElementById('clienteId').value;
        const cliente = {
            id: id ? parseInt(id) : Date.now(),
            nome: document.getElementById('clienteNome').value,
            cnpj: document.getElementById('clienteCnpj').value,
            telefone: document.getElementById('clienteTelefone').value,
            email: document.getElementById('clienteEmail').value,
            endereco: document.getElementById('clienteEndereco').value,
            status: document.getElementById('clienteStatus').value,
            cicloCompras: parseInt(document.getElementById('clienteCiclo').value),
            ultimaCompra: id ? this.data.clientes.find(c => c.id == id)?.ultimaCompra : null,
            totalCompras: id ? this.data.clientes.find(c => c.id == id)?.totalCompras || 0 : 0
        };

        if (id) {
            const index = this.data.clientes.findIndex(c => c.id == id);
            this.data.clientes[index] = cliente;
        } else {
            this.data.clientes.push(cliente);
        }

        this.saveData();
        this.renderClientesTable();
        this.updateMetrics();
        this.renderDashboard();
        window.closeModal('clienteModal');
        this.showNotification('Cliente salvo com sucesso!', 'success');
    }

    editCliente(id) {
        const cliente = this.data.clientes.find(c => c.id == id);
        if (!cliente) return;

        document.getElementById('clienteId').value = cliente.id;
        document.getElementById('clienteNome').value = cliente.nome;
        document.getElementById('clienteCnpj').value = cliente.cnpj;
        document.getElementById('clienteTelefone').value = cliente.telefone;
        document.getElementById('clienteEmail').value = cliente.email;
        document.getElementById('clienteEndereco').value = cliente.endereco;
        document.getElementById('clienteStatus').value = cliente.status;
        document.getElementById('clienteCiclo').value = cliente.cicloCompras;

        document.getElementById('clienteModalTitle').textContent = 'Editar Cliente';
        window.openModal('clienteModal');
    }

    deleteCliente(id) {
        if (confirm('Tem certeza que deseja excluir este cliente?')) {
            this.data.clientes = this.data.clientes.filter(c => c.id != id);
            this.saveData();
            this.renderClientesTable();
            this.updateMetrics();
            this.renderDashboard();
            this.showNotification('Cliente excluído com sucesso!', 'success');
        }
    }

    // CRUD Operations - Representadas
    saveRepresentada() {
        const id = document.getElementById('representadaId').value;
        const representada = {
            id: id ? parseInt(id) : Date.now(),
            nome: document.getElementById('representadaNome').value,
            cnpj: document.getElementById('representadaCnpj').value,
            telefone: document.getElementById('representadaTelefone').value,
            email: document.getElementById('representadaEmail').value,
            comissao: parseFloat(document.getElementById('representadaComissao').value),
            produtos: document.getElementById('representadaProdutos').value.split(',').map(p => p.trim()).filter(p => p)
        };

        if (id) {
            const index = this.data.representadas.findIndex(r => r.id == id);
            this.data.representadas[index] = representada;
        } else {
            this.data.representadas.push(representada);
        }

        this.saveData();
        this.renderRepresentadasTable();
        this.populateRepresentadaSelects();
        window.closeModal('representadaModal');
        this.showNotification('Representada salva com sucesso!', 'success');
    }

    editRepresentada(id) {
        const representada = this.data.representadas.find(r => r.id == id);
        if (!representada) return;

        document.getElementById('representadaId').value = representada.id;
        document.getElementById('representadaNome').value = representada.nome;
        document.getElementById('representadaCnpj').value = representada.cnpj;
        document.getElementById('representadaTelefone').value = representada.telefone;
        document.getElementById('representadaEmail').value = representada.email;
        document.getElementById('representadaComissao').value = representada.comissao;
        document.getElementById('representadaProdutos').value = representada.produtos.join(', ');

        document.getElementById('representadaModalTitle').textContent = 'Editar Representada';
        window.openModal('representadaModal');
    }

    deleteRepresentada(id) {
        if (confirm('Tem certeza que deseja excluir esta representada?')) {
            this.data.representadas = this.data.representadas.filter(r => r.id != id);
            this.saveData();
            this.renderRepresentadasTable();
            this.populateRepresentadaSelects();
            this.showNotification('Representada excluída com sucesso!', 'success');
        }
    }

    // CRUD Operations - Produtos
    saveProduto() {
        const id = document.getElementById('produtoId').value;
        const produto = {
            id: id ? parseInt(id) : Date.now(),
            codigo: document.getElementById('produtoCodigo').value,
            descricao: document.getElementById('produtoDescricao').value,
            marca: document.getElementById('produtoMarca').value,
            representada: document.getElementById('produtoRepresentada').value,
            preco: parseFloat(document.getElementById('produtoPreco').value),
            categoria: document.getElementById('produtoCategoria').value,
            estoque: parseInt(document.getElementById('produtoEstoque').value)
        };

        if (id) {
            const index = this.data.produtos.findIndex(p => p.id == id);
            this.data.produtos[index] = produto;
        } else {
            this.data.produtos.push(produto);
        }

        this.saveData();
        this.renderProdutosTable();
        this.populateProdutoSelects();
        window.closeModal('produtoModal');
        this.showNotification('Produto salvo com sucesso!', 'success');
    }

    editProduto(id) {
        const produto = this.data.produtos.find(p => p.id == id);
        if (!produto) return;

        document.getElementById('produtoId').value = produto.id;
        document.getElementById('produtoCodigo').value = produto.codigo;
        document.getElementById('produtoDescricao').value = produto.descricao;
        document.getElementById('produtoMarca').value = produto.marca;
        document.getElementById('produtoRepresentada').value = produto.representada;
        document.getElementById('produtoPreco').value = produto.preco;
        document.getElementById('produtoCategoria').value = produto.categoria;
        document.getElementById('produtoEstoque').value = produto.estoque;

        document.getElementById('produtoModalTitle').textContent = 'Editar Produto';
        window.openModal('produtoModal');
    }

    deleteProduto(id) {
        if (confirm('Tem certeza que deseja excluir este produto?')) {
            this.data.produtos = this.data.produtos.filter(p => p.id != id);
            this.saveData();
            this.renderProdutosTable();
            this.populateProdutoSelects();
            this.showNotification('Produto excluído com sucesso!', 'success');
        }
    }

    // CRUD Operations - Pedidos
    setupPedidoModal() {
        this.populateClienteSelects();
        this.populateProdutoSelects();
        document.getElementById('pedidoData').value = this.formatDateForInput(new Date());
    }

    savePedido() {
        const id = document.getElementById('pedidoId').value;
        const cliente = document.getElementById('pedidoCliente').value;

        if (!cliente) {
            this.showNotification('Selecione um cliente!', 'error');
            return;
        }

        if (this.currentPedidoItems.length === 0) {
            this.showNotification('Adicione pelo menos um item ao pedido!', 'error');
            return;
        }

        const total = this.calculatePedidoTotal();
        const comissao = this.calculatePedidoComissao();

        const pedido = {
            id: id ? parseInt(id) : Date.now(),
            cliente: cliente,
            data: document.getElementById('pedidoData').value,
            status: document.getElementById('pedidoStatus').value,
            total: total,
            comissao: comissao,
            itens: [...this.currentPedidoItems]
        };

        if (id) {
            const index = this.data.pedidos.findIndex(p => p.id == id);
            this.data.pedidos[index] = pedido;
        } else {
            this.data.pedidos.push(pedido);
            
            // Update cliente's ultima compra
            const clienteObj = this.data.clientes.find(c => c.nome === pedido.cliente);
            if (clienteObj) {
                clienteObj.ultimaCompra = pedido.data;
                clienteObj.totalCompras = (clienteObj.totalCompras || 0) + pedido.total;
            }
        }

        this.saveData();
        this.renderPedidosTable();
        this.updateMetrics();
        this.renderDashboard();
        window.closeModal('pedidoModal');
        this.showNotification('Pedido salvo com sucesso!', 'success');
    }

    addItemToPedido() {
        const produtoSelect = document.getElementById('itemProduto');
        const quantidade = parseInt(document.getElementById('itemQuantidade').value) || 1;
        const desconto = parseFloat(document.getElementById('itemDesconto').value) || 0;

        if (!produtoSelect.value) {
            this.showNotification('Selecione um produto!', 'error');
            return;
        }

        const produto = this.data.produtos.find(p => p.descricao === produtoSelect.value);
        if (!produto) return;

        // Check if product already exists in items
        const existingItemIndex = this.currentPedidoItems.findIndex(item => item.produto === produto.descricao);
        
        if (existingItemIndex >= 0) {
            // Update existing item
            this.currentPedidoItems[existingItemIndex].quantidade += quantidade;
        } else {
            // Add new item
            this.currentPedidoItems.push({
                produto: produto.descricao,
                quantidade: quantidade,
                preco: produto.preco,
                desconto: desconto
            });
        }

        this.renderPedidoItemsTable();
        this.updatePedidoTotals();

        // Reset form
        produtoSelect.value = '';
        document.getElementById('itemQuantidade').value = '1';
        document.getElementById('itemDesconto').value = '0';
    }

    renderPedidoItemsTable() {
        const tableBody = document.getElementById('pedidoItensTableBody');
        tableBody.innerHTML = '';

        this.currentPedidoItems.forEach((item, index) => {
            const row = document.createElement('tr');
            const subtotal = item.preco * item.quantidade * (1 - item.desconto/100);
            
            row.innerHTML = `
                <td>${item.produto}</td>
                <td>${item.quantidade}</td>
                <td>R$ ${this.formatCurrency(item.preco)}</td>
                <td>${item.desconto}%</td>
                <td>R$ ${this.formatCurrency(subtotal)}</td>
                <td><button type="button" class="btn-sm btn-delete" onclick="sgc.removeItemFromPedido(${index})">Remover</button></td>
            `;
            tableBody.appendChild(row);
        });
    }

    removeItemFromPedido(index) {
        this.currentPedidoItems.splice(index, 1);
        this.renderPedidoItemsTable();
        this.updatePedidoTotals();
    }

    updatePedidoTotals() {
        const subtotal = this.calculatePedidoTotal();
        const comissao = this.calculatePedidoComissao();

        document.getElementById('pedidoSubtotal').textContent = `R$ ${this.formatCurrency(subtotal)}`;
        document.getElementById('pedidoComissaoTotal').textContent = `R$ ${this.formatCurrency(comissao)}`;
        document.getElementById('pedidoTotal').textContent = `R$ ${this.formatCurrency(subtotal)}`;
    }

    calculatePedidoTotal() {
        return this.currentPedidoItems.reduce((total, item) => {
            return total + (item.preco * item.quantidade * (1 - item.desconto/100));
        }, 0);
    }

    calculatePedidoComissao() {
        let comissaoTotal = 0;
        
        this.currentPedidoItems.forEach(item => {
            const produto = this.data.produtos.find(p => p.descricao === item.produto);
            if (produto) {
                const representada = this.data.representadas.find(r => r.nome === produto.representada);
                if (representada) {
                    const valorItem = item.preco * item.quantidade * (1 - item.desconto/100);
                    comissaoTotal += valorItem * (representada.comissao / 100);
                }
            }
        });

        return comissaoTotal;
    }

    editPedido(id) {
        const pedido = this.data.pedidos.find(p => p.id == id);
        if (!pedido) return;

        document.getElementById('pedidoId').value = pedido.id;
        document.getElementById('pedidoCliente').value = pedido.cliente;
        document.getElementById('pedidoData').value = pedido.data;
        document.getElementById('pedidoStatus').value = pedido.status;

        // Load items
        this.currentPedidoItems = [...pedido.itens];
        this.renderPedidoItemsTable();
        this.updatePedidoTotals();

        document.getElementById('pedidoModalTitle').textContent = 'Editar Pedido';
        window.openModal('pedidoModal');
    }

    deletePedido(id) {
        if (confirm('Tem certeza que deseja excluir este pedido?')) {
            this.data.pedidos = this.data.pedidos.filter(p => p.id != id);
            this.saveData();
            this.renderPedidosTable();
            this.updateMetrics();
            this.renderDashboard();
            this.showNotification('Pedido excluído com sucesso!', 'success');
        }
    }

    // CRUD Operations - Visitas
    saveVisita() {
        const id = document.getElementById('visitaId').value;
        const visita = {
            id: id ? parseInt(id) : Date.now(),
            cliente: document.getElementById('visitaCliente').value,
            data: document.getElementById('visitaData').value,
            horario: document.getElementById('visitaHorario').value,
            status: document.getElementById('visitaStatus').value,
            observacoes: document.getElementById('visitaObservacoes').value
        };

        if (id) {
            const index = this.data.visitas.findIndex(v => v.id == id);
            this.data.visitas[index] = visita;
        } else {
            this.data.visitas.push(visita);
        }

        this.saveData();
        this.renderCalendar();
        this.renderProximasVisitas();
        window.closeModal('visitaModal');
        this.showNotification('Visita salva com sucesso!', 'success');
    }

    editVisita(id) {
        const visita = this.data.visitas.find(v => v.id == id);
        if (!visita) return;

        document.getElementById('visitaId').value = visita.id;
        document.getElementById('visitaCliente').value = visita.cliente;
        document.getElementById('visitaData').value = visita.data;
        document.getElementById('visitaHorario').value = visita.horario;
        document.getElementById('visitaStatus').value = visita.status;
        document.getElementById('visitaObservacoes').value = visita.observacoes;

        document.getElementById('visitaModalTitle').textContent = 'Editar Visita';
        window.openModal('visitaModal');
    }

    deleteVisita(id) {
        if (confirm('Tem certeza que deseja excluir esta visita?')) {
            this.data.visitas = this.data.visitas.filter(v => v.id != id);
            this.saveData();
            this.renderCalendar();
            this.renderProximasVisitas();
            this.showNotification('Visita excluída com sucesso!', 'success');
        }
    }

    // Rendering Functions
    renderDashboard() {
        this.updateMetrics();
        this.renderMetricCards();
        this.renderVendasChart();
        this.renderAlertas();
        this.renderProximasVisitas();
    }

    updateMetrics() {
        const hoje = new Date();
        const mesAtual = hoje.getMonth();
        const anoAtual = hoje.getFullYear();

        // Calculate current month sales
        const vendasMes = this.data.pedidos
            .filter(p => {
                const dataPedido = new Date(p.data);
                return dataPedido.getMonth() === mesAtual && 
                       dataPedido.getFullYear() === anoAtual &&
                       p.status !== 'cancelado';
            })
            .reduce((total, p) => total + p.total, 0);

        // Count pending orders
        const pedidosPendentes = this.data.pedidos.filter(p => p.status === 'pendente').length;

        // Count active clients
        const clientesAtivos = this.data.clientes.filter(c => c.status === 'ativo').length;

        // Calculate commission to receive
        const comissaoAReceber = this.data.pedidos
            .filter(p => p.status === 'aprovado' || p.status === 'faturado')
            .reduce((total, p) => total + p.comissao, 0);

        this.data.metricas = {
            vendasMes,
            pedidosPendentes,
            clientesAtivos,
            comissaoAReceber,
            metaMensal: 50000.00
        };

        this.saveData();
    }

    renderMetricCards() {
        const vendasMesEl = document.getElementById('vendasMes');
        const pedidosPendentesEl = document.getElementById('pedidosPendentes');
        const clientesAtivosEl = document.getElementById('clientesAtivos');
        const comissaoAReceberEl = document.getElementById('comissaoAReceber');

        if (vendasMesEl) vendasMesEl.textContent = `R$ ${this.formatCurrency(this.data.metricas.vendasMes)}`;
        if (pedidosPendentesEl) pedidosPendentesEl.textContent = this.data.metricas.pedidosPendentes;
        if (clientesAtivosEl) clientesAtivosEl.textContent = this.data.metricas.clientesAtivos;
        if (comissaoAReceberEl) comissaoAReceberEl.textContent = `R$ ${this.formatCurrency(this.data.metricas.comissaoAReceber)}`;
    }

    renderVendasChart() {
        const ctx = document.getElementById('vendasChart');
        if (!ctx) return;

        if (this.charts.vendas) {
            this.charts.vendas.destroy();
        }

        // Generate data for last 6 months
        const labels = [];
        const data = [];
        const hoje = new Date();
        
        for (let i = 5; i >= 0; i--) {
            const data_mes = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1);
            labels.push(data_mes.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }));
            
            const vendas = this.data.pedidos
                .filter(p => {
                    const dataPedido = new Date(p.data);
                    return dataPedido.getMonth() === data_mes.getMonth() &&
                           dataPedido.getFullYear() === data_mes.getFullYear() &&
                           p.status !== 'cancelado';
                })
                .reduce((total, p) => total + p.total, 0);
            
            data.push(vendas);
        }

        this.charts.vendas = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Vendas (R$)',
                    data: data,
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return 'R$ ' + value.toLocaleString('pt-BR');
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    renderAlertas() {
        const alertsList = document.getElementById('alertsList');
        if (!alertsList) return;
        
        alertsList.innerHTML = '';

        // Check for inactive clients
        const hoje = new Date();
        this.data.clientes.forEach(cliente => {
            if (cliente.ultimaCompra) {
                const ultimaCompra = new Date(cliente.ultimaCompra);
                const diasSemComprar = Math.floor((hoje - ultimaCompra) / (1000 * 60 * 60 * 24));
                
                if (diasSemComprar > cliente.cicloCompras * 1.5) {
                    const alert = document.createElement('div');
                    alert.className = 'alert-item warning';
                    alert.innerHTML = `
                        <strong>${cliente.nome}</strong><br>
                        Sem compras há ${diasSemComprar} dias (ciclo: ${cliente.cicloCompras} dias)
                    `;
                    alertsList.appendChild(alert);
                }
            }
        });

        // Check for low stock
        this.data.produtos.forEach(produto => {
            if (produto.estoque < 10) {
                const alert = document.createElement('div');
                alert.className = 'alert-item error';
                alert.innerHTML = `
                    <strong>Estoque baixo:</strong><br>
                    ${produto.descricao} (${produto.estoque} unidades)
                `;
                alertsList.appendChild(alert);
            }
        });

        if (alertsList.children.length === 0) {
            alertsList.innerHTML = '<div class="alert-item info">Nenhum alerta no momento</div>';
        }
    }

    renderProximasVisitas() {
        const visitasList = document.getElementById('proximasVisitas');
        if (!visitasList) return;
        
        visitasList.innerHTML = '';

        const hoje = new Date();
        const proximasVisitas = this.data.visitas
            .filter(v => new Date(v.data) >= hoje && v.status === 'agendada')
            .sort((a, b) => new Date(a.data) - new Date(b.data))
            .slice(0, 5);

        proximasVisitas.forEach(visita => {
            const visitaDiv = document.createElement('div');
            visitaDiv.className = 'visit-item';
            visitaDiv.innerHTML = `
                <div class="visit-date">${this.formatDate(visita.data)} - ${visita.horario}</div>
                <div class="visit-client">${visita.cliente}</div>
                <div class="visit-notes">${visita.observacoes || 'Sem observações'}</div>
            `;
            visitasList.appendChild(visitaDiv);
        });

        if (proximasVisitas.length === 0) {
            visitasList.innerHTML = '<div class="empty-state">Nenhuma visita agendada</div>';
        }
    }

    renderAllTables() {
        this.renderClientesTable();
        this.renderRepresentadasTable();
        this.renderProdutosTable();
        this.renderPedidosTable();
        this.populateSelects();
    }

    renderClientesTable() {
        const tbody = document.getElementById('clientesTableBody');
        if (!tbody) return;
        
        tbody.innerHTML = '';

        this.data.clientes.forEach(cliente => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${cliente.nome}</td>
                <td>${cliente.cnpj}</td>
                <td>${cliente.telefone}</td>
                <td><span class="status-badge ${cliente.status}">${cliente.status}</span></td>
                <td>${cliente.ultimaCompra ? this.formatDate(cliente.ultimaCompra) : 'Nunca'}</td>
                <td>R$ ${this.formatCurrency(cliente.totalCompras || 0)}</td>
                <td class="action-buttons">
                    <button class="btn-sm btn-edit" onclick="sgc.editCliente(${cliente.id})">Editar</button>
                    <button class="btn-sm btn-delete" onclick="sgc.deleteCliente(${cliente.id})">Excluir</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    renderRepresentadasTable() {
        const tbody = document.getElementById('representadasTableBody');
        if (!tbody) return;
        
        tbody.innerHTML = '';

        this.data.representadas.forEach(representada => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${representada.nome}</td>
                <td>${representada.cnpj}</td>
                <td>${representada.telefone}</td>
                <td>${representada.comissao}%</td>
                <td>${representada.produtos.join(', ')}</td>
                <td class="action-buttons">
                    <button class="btn-sm btn-edit" onclick="sgc.editRepresentada(${representada.id})">Editar</button>
                    <button class="btn-sm btn-delete" onclick="sgc.deleteRepresentada(${representada.id})">Excluir</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    renderProdutosTable() {
        const tbody = document.getElementById('produtosTableBody');
        if (!tbody) return;
        
        tbody.innerHTML = '';

        this.data.produtos.forEach(produto => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${produto.codigo}</td>
                <td>${produto.descricao}</td>
                <td>${produto.marca}</td>
                <td>${produto.representada}</td>
                <td>R$ ${this.formatCurrency(produto.preco)}</td>
                <td>${produto.categoria}</td>
                <td>${produto.estoque}</td>
                <td class="action-buttons">
                    <button class="btn-sm btn-edit" onclick="sgc.editProduto(${produto.id})">Editar</button>
                    <button class="btn-sm btn-delete" onclick="sgc.deleteProduto(${produto.id})">Excluir</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    renderPedidosTable() {
        const tbody = document.getElementById('pedidosTableBody');
        if (!tbody) return;
        
        tbody.innerHTML = '';

        this.data.pedidos.forEach(pedido => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>#${pedido.id}</td>
                <td>${pedido.cliente}</td>
                <td>${this.formatDate(pedido.data)}</td>
                <td><span class="status-badge ${pedido.status}">${pedido.status}</span></td>
                <td>R$ ${this.formatCurrency(pedido.total)}</td>
                <td>R$ ${this.formatCurrency(pedido.comissao)}</td>
                <td class="action-buttons">
                    <button class="btn-sm btn-edit" onclick="sgc.editPedido(${pedido.id})">Editar</button>
                    <button class="btn-sm btn-delete" onclick="sgc.deletePedido(${pedido.id})">Excluir</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    // Populate Selects
    populateSelects() {
        this.populateClienteSelects();
        this.populateRepresentadaSelects();
        this.populateProdutoSelects();
    }

    populateClienteSelects() {
        const selects = ['pedidoCliente', 'visitaCliente'];
        selects.forEach(selectId => {
            const select = document.getElementById(selectId);
            if (select) {
                const currentValue = select.value;
                select.innerHTML = '<option value="">Selecione...</option>';
                this.data.clientes.forEach(cliente => {
                    const option = document.createElement('option');
                    option.value = cliente.nome;
                    option.textContent = cliente.nome;
                    select.appendChild(option);
                });
                select.value = currentValue;
            }
        });
    }

    populateRepresentadaSelects() {
        const selects = ['produtoRepresentada', 'filterRepresentada'];
        selects.forEach(selectId => {
            const select = document.getElementById(selectId);
            if (select) {
                const currentValue = select.value;
                if (selectId === 'filterRepresentada') {
                    select.innerHTML = '<option value="">Todas as representadas</option>';
                } else {
                    select.innerHTML = '<option value="">Selecione...</option>';
                }
                this.data.representadas.forEach(representada => {
                    const option = document.createElement('option');
                    option.value = representada.nome;
                    option.textContent = representada.nome;
                    select.appendChild(option);
                });
                select.value = currentValue;
            }
        });
    }

    populateProdutoSelects() {
        const selects = ['itemProduto'];
        selects.forEach(selectId => {
            const select = document.getElementById(selectId);
            if (select) {
                const currentValue = select.value;
                select.innerHTML = '<option value="">Selecione um produto...</option>';
                this.data.produtos.forEach(produto => {
                    const option = document.createElement('option');
                    option.value = produto.descricao;
                    option.textContent = `${produto.codigo} - ${produto.descricao} (R$ ${this.formatCurrency(produto.preco)})`;
                    select.appendChild(option);
                });
                select.value = currentValue;
            }
        });
    }

    // Calendar
    setupCalendar() {
        const prevBtn = document.getElementById('prevMonth');
        const nextBtn = document.getElementById('nextMonth');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.currentDate.setMonth(this.currentDate.getMonth() - 1);
                this.renderCalendar();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.currentDate.setMonth(this.currentDate.getMonth() + 1);
                this.renderCalendar();
            });
        }

        this.renderCalendar();
    }

    renderCalendar() {
        const calendar = document.getElementById('calendar');
        const currentMonth = document.getElementById('currentMonth');
        
        if (!calendar || !currentMonth) return;

        currentMonth.textContent = this.currentDate.toLocaleDateString('pt-BR', { 
            month: 'long', 
            year: 'numeric' 
        });

        calendar.innerHTML = '';

        // Add weekday headers
        const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        weekdays.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'calendar-day-header';
            dayHeader.textContent = day;
            dayHeader.style.cssText = `
                background: var(--color-bg-1);
                padding: var(--space-8);
                text-align: center;
                font-weight: var(--font-weight-semibold);
                font-size: var(--font-size-sm);
            `;
            calendar.appendChild(dayHeader);
        });

        // Get first day of month and number of days
        const firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
        const lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay();

        // Add empty cells for days before month starts
        for (let i = 0; i < startingDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day other-month';
            calendar.appendChild(emptyDay);
        }

        // Add days of the month
        const today = new Date();
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            
            const dayDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day);
            const dateString = dayDate.toISOString().split('T')[0];
            
            if (dayDate.toDateString() === today.toDateString()) {
                dayElement.classList.add('today');
            }

            dayElement.innerHTML = `<div class="calendar-day-number">${day}</div>`;

            // Add visits for this day
            const visitas = this.data.visitas.filter(v => v.data === dateString);
            visitas.forEach(visita => {
                const visitaElement = document.createElement('div');
                visitaElement.className = 'calendar-visit';
                visitaElement.textContent = `${visita.horario} - ${visita.cliente}`;
                visitaElement.onclick = (e) => {
                    e.stopPropagation();
                    this.editVisita(visita.id);
                };
                dayElement.appendChild(visitaElement);
            });

            dayElement.onclick = () => {
                document.getElementById('visitaData').value = dateString;
                window.openModal('visitaModal');
            };

            calendar.appendChild(dayElement);
        }

        this.renderVisitasHoje();
    }

    renderVisitasHoje() {
        const visitasHoje = document.getElementById('visitasHoje');
        if (!visitasHoje) return;
        
        const hoje = new Date().toISOString().split('T')[0];
        
        const visitas = this.data.visitas.filter(v => v.data === hoje);
        
        visitasHoje.innerHTML = '';
        
        if (visitas.length === 0) {
            visitasHoje.innerHTML = '<div class="empty-state">Nenhuma visita hoje</div>';
            return;
        }

        visitas.forEach(visita => {
            const visitaDiv = document.createElement('div');
            visitaDiv.className = 'visit-item';
            visitaDiv.innerHTML = `
                <div class="visit-date">${visita.horario}</div>
                <div class="visit-client">${visita.cliente}</div>
                <div class="visit-notes">${visita.observacoes || 'Sem observações'}</div>
                <div class="action-buttons">
                    <button class="btn-sm btn-edit" onclick="sgc.editVisita(${visita.id})">Editar</button>
                    <button class="btn-sm btn-delete" onclick="sgc.deleteVisita(${visita.id})">Excluir</button>
                </div>
            `;
            visitasHoje.appendChild(visitaDiv);
        });
    }

    // Reports
    renderReports() {
        this.renderRelatorioVendasChart();
        this.renderTopProdutosChart();
        this.renderComissoesChart();
        this.renderPerformanceVisitas();
    }

    renderRelatorioVendasChart() {
        const ctx = document.getElementById('relatorioVendasChart');
        if (!ctx) return;

        if (this.charts.relatorioVendas) {
            this.charts.relatorioVendas.destroy();
        }

        // Sample data - last 12 months
        const labels = [];
        const data = [];
        const hoje = new Date();
        
        for (let i = 11; i >= 0; i--) {
            const data_mes = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1);
            labels.push(data_mes.toLocaleDateString('pt-BR', { month: 'short' }));
            
            const vendas = Math.random() * 30000 + 10000; // Sample data
            data.push(vendas);
        }

        this.charts.relatorioVendas = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Vendas (R$)',
                    data: data,
                    backgroundColor: '#1FB8CD',
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return 'R$ ' + value.toLocaleString('pt-BR');
                            }
                        }
                    }
                }
            }
        });
    }

    renderTopProdutosChart() {
        const ctx = document.getElementById('topProdutosChart');
        if (!ctx) return;

        if (this.charts.topProdutos) {
            this.charts.topProdutos.destroy();
        }

        // Get top products from orders
        const produtoVendas = {};
        this.data.pedidos.forEach(pedido => {
            pedido.itens.forEach(item => {
                produtoVendas[item.produto] = (produtoVendas[item.produto] || 0) + (item.quantidade * item.preco);
            });
        });

        const sortedProducts = Object.entries(produtoVendas)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);

        const labels = sortedProducts.length ? sortedProducts.map(p => p[0]) : ['Nenhum produto'];
        const data = sortedProducts.length ? sortedProducts.map(p => p[1]) : [100];

        this.charts.topProdutos = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    renderComissoesChart() {
        const ctx = document.getElementById('comissoesChart');
        if (!ctx) return;

        if (this.charts.comissoes) {
            this.charts.comissoes.destroy();
        }

        // Calculate commissions by representative
        const comissoesPorRep = {};
        this.data.pedidos.forEach(pedido => {
            pedido.itens.forEach(item => {
                const produto = this.data.produtos.find(p => p.descricao === item.produto);
                if (produto) {
                    const representada = this.data.representadas.find(r => r.nome === produto.representada);
                    if (representada) {
                        const comissao = item.preco * item.quantidade * (representada.comissao / 100);
                        comissoesPorRep[representada.nome] = (comissoesPorRep[representada.nome] || 0) + comissao;
                    }
                }
            });
        });

        const labels = Object.keys(comissoesPorRep);
        const data = Object.values(comissoesPorRep);

        // Fallback data if no commissions
        if (labels.length === 0) {
            labels.push('Sem dados');
            data.push(0);
        }

        this.charts.comissoes = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Comissão (R$)',
                    data: data,
                    backgroundColor: '#FFC185',
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return 'R$ ' + value.toLocaleString('pt-BR');
                            }
                        }
                    }
                }
            }
        });
    }

    renderPerformanceVisitas() {
        const performance = document.getElementById('performanceVisitas');
        if (!performance) return;
        
        performance.innerHTML = '';

        const totalVisitas = this.data.visitas.length;
        const visitasRealizadas = this.data.visitas.filter(v => v.status === 'realizada').length;
        const visitasAgendadas = this.data.visitas.filter(v => v.status === 'agendada').length;
        const visitasCanceladas = this.data.visitas.filter(v => v.status === 'cancelada').length;

        const stats = [
            { label: 'Total de Visitas', value: totalVisitas },
            { label: 'Realizadas', value: visitasRealizadas },
            { label: 'Agendadas', value: visitasAgendadas },
            { label: 'Canceladas', value: visitasCanceladas },
            { label: 'Taxa de Realização', value: totalVisitas ? `${Math.round(visitasRealizadas / totalVisitas * 100)}%` : '0%' }
        ];

        stats.forEach(stat => {
            const statDiv = document.createElement('div');
            statDiv.className = 'stat-item';
            statDiv.innerHTML = `
                <span class="stat-label">${stat.label}</span>
                <span class="stat-value">${stat.value}</span>
            `;
            performance.appendChild(statDiv);
        });
    }

    // Filters
    setupFilters() {
        // Cliente filters
        const searchClientes = document.getElementById('searchClientes');
        if (searchClientes) {
            searchClientes.addEventListener('input', (e) => {
                this.filterTable('clientesTableBody', e.target.value, 0);
            });
        }

        const filterStatus = document.getElementById('filterStatus');
        if (filterStatus) {
            filterStatus.addEventListener('change', (e) => {
                this.filterTable('clientesTableBody', e.target.value, 3, true);
            });
        }

        // Produto filters
        const searchProdutos = document.getElementById('searchProdutos');
        if (searchProdutos) {
            searchProdutos.addEventListener('input', (e) => {
                this.filterTable('produtosTableBody', e.target.value, [1, 2]); // Description and brand
            });
        }

        // Pedido filters
        const searchPedidos = document.getElementById('searchPedidos');
        if (searchPedidos) {
            searchPedidos.addEventListener('input', (e) => {
                this.filterTable('pedidosTableBody', e.target.value, 1); // Cliente
            });
        }

        const filterStatusPedido = document.getElementById('filterStatusPedido');
        if (filterStatusPedido) {
            filterStatusPedido.addEventListener('change', (e) => {
                this.filterTable('pedidosTableBody', e.target.value, 3, true);
            });
        }
    }

    filterTable(tableBodyId, filterValue, columns, exactMatch = false) {
        const tbody = document.getElementById(tableBodyId);
        if (!tbody) return;
        
        const rows = tbody.querySelectorAll('tr');

        rows.forEach(row => {
            let showRow = false;
            const columnsToCheck = Array.isArray(columns) ? columns : [columns];

            columnsToCheck.forEach(colIndex => {
                const cell = row.cells[colIndex];
                if (cell) {
                    const cellText = cell.textContent.toLowerCase();
                    const filterText = filterValue.toLowerCase();

                    if (exactMatch) {
                        if (filterText === '' || cellText.includes(filterText)) {
                            showRow = true;
                        }
                    } else {
                        if (filterText === '' || cellText.includes(filterText)) {
                            showRow = true;
                        }
                    }
                }
            });

            row.style.display = showRow ? '' : 'none';
        });
    }

    // Utility Functions
    formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    }

    formatDateForInput(date) {
        return date.toISOString().split('T')[0];
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div style="font-weight: 500; margin-bottom: 4px;">${type === 'success' ? 'Sucesso' : type === 'error' ? 'Erro' : 'Info'}</div>
            <div>${message}</div>
        `;

        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);

        // Hide and remove notification
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Global functions for buttons
window.gerarRelatorioVendas = function() {
    const dataInicio = document.getElementById('dataInicio');
    const dataFim = document.getElementById('dataFim');
    
    if (!dataInicio?.value || !dataFim?.value) {
        sgc.showNotification('Selecione as datas de início e fim', 'error');
        return;
    }
    
    sgc.showNotification('Relatório gerado com sucesso!', 'success');
};

// Initialize the system
let sgc;
document.addEventListener('DOMContentLoaded', () => {
    sgc = new SGC();
    
    // Make sgc available globally for onclick handlers
    window.sgc = sgc;
});