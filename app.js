// Sistema de Gestão Comercial - JavaScript
class SGC {
    constructor() {
        this.data = {
            clientes: [],
            representadas: [],
            produtos: [],
            orcamentos: [],
            visitas: [],
            configuracoes: {},
            metricas: {}
        };
        this.currentDate = new Date();
        this.charts = {};
        this.currentOrcamentoItems = [];
        this.nextOrcamentoNumber = 1;
        this.initialized = false;
    }

    async init() {
        if (this.initialized) return;
        
        console.log('Starting SGC initialization...');
        
        // Wait for DOM to be ready
        await this.waitForDOM();
        
        this.loadData();
        this.setupNavigation();
        this.setupModals();
        this.setupForms();
        this.setupFilters();
        this.renderDashboard();
        this.renderAllTables();
        this.setupCalendar();
        this.renderReports();
        this.loadConfigurations();
        
        this.initialized = true;
        console.log('SGC initialization completed');
        this.showNotification('Sistema carregado com sucesso!', 'success');
    }

    waitForDOM() {
        return new Promise((resolve) => {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', resolve);
            } else {
                resolve();
            }
        });
    }

    // Data Management
    loadData() {
        const savedData = localStorage.getItem('sgc_data');
        if (savedData) {
            this.data = JSON.parse(savedData);
            this.nextOrcamentoNumber = this.data.orcamentos.length + 1;
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
                        contato: "Ana Santos",
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
                        contato: "Carlos Mendes",
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
                        contato: "Maria Oliveira",
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
                        descricao: "Notebook ElectronTech Intel i7 16GB RAM 512GB SSD",
                        marca: "ElectronTech",
                        representada: "ElectronTech Brasil",
                        preco: 2500.00,
                        categoria: "Informática",
                        estoque: 25
                    },
                    {
                        id: 2,
                        codigo: "MES001",
                        descricao: "Mesa de Escritório Premium Madeira Nobre 1,60m",
                        marca: "MadeiraNobre",
                        representada: "MadeiraNobre Móveis",
                        preco: 850.00,
                        categoria: "Móveis",
                        estoque: 15
                    },
                    {
                        id: 3,
                        codigo: "FUR001",
                        descricao: "Furadeira Impact Pro 800W com Kit Brocas",
                        marca: "FerraBrasil",
                        representada: "FerraBrasil Ltda",
                        preco: 320.00,
                        categoria: "Ferramentas",
                        estoque: 40
                    },
                    {
                        id: 4,
                        codigo: "TAB001",
                        descricao: "Tablet ElectronTech 10\" 64GB WiFi + 4G",
                        marca: "ElectronTech",
                        representada: "ElectronTech Brasil",
                        preco: 899.00,
                        categoria: "Informática",
                        estoque: 30
                    },
                    {
                        id: 5,
                        codigo: "CAD001",
                        descricao: "Cadeira Ergonômica Executiva Couro Sintético",
                        marca: "MadeiraNobre",
                        representada: "MadeiraNobre Móveis",
                        preco: 450.00,
                        categoria: "Móveis",
                        estoque: 20
                    }
                ],
                orcamentos: [
                    {
                        id: 1,
                        numero: "ORÇ-2024-001",
                        cliente: "TechSolutions Ltda",
                        data: "2024-12-15",
                        validade: "2025-01-14",
                        status: "enviado",
                        subtotal: 5000.00,
                        desconto: 0,
                        total: 5000.00,
                        comissao: 425.00,
                        observacoes: "Entrega em 15 dias úteis. Pagamento 30 dias.",
                        itens: [
                            {
                                codigo: "NB001",
                                produto: "Notebook ElectronTech Intel i7 16GB RAM 512GB SSD", 
                                quantidade: 2, 
                                precoUnitario: 2500.00, 
                                desconto: 0, 
                                total: 5000.00
                            }
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
                        observacoes: "Apresentar novos produtos e orçamento"
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
                configuracoes: {
                    representante: {
                        nome: "João Silva Representações",
                        cnpj: "12.345.678/0001-90",
                        endereco: "Rua Comercial, 123 - Centro - Curitiba/PR",
                        telefone: "(41) 3333-4444",
                        email: "joao@representacoes.com.br"
                    },
                    orcamento: {
                        condicoesPagamento: "30 dias após entrega",
                        prazoEntrega: "15 dias úteis",
                        validadeOrcamento: 30,
                        observacoesPadrao: "Preços válidos por 30 dias. Produtos sujeitos à disponibilidade de estoque."
                    }
                },
                metricas: {
                    vendasMes: 23500.00,
                    orcamentosPendentes: 3,
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

    // Navigation - Fixed implementation
    setupNavigation() {
        console.log('Setting up navigation...');
        
        // Get all navigation items
        const navItems = document.querySelectorAll('.nav-item');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navMobile = document.getElementById('navMobile');

        console.log('Found nav items:', navItems.length);

        // Setup navigation event listeners
        navItems.forEach((item, index) => {
            console.log(`Setting up nav item ${index}:`, item.getAttribute('data-section'));
            
            // Remove any existing listeners by cloning the node
            const newItem = item.cloneNode(true);
            item.parentNode.replaceChild(newItem, item);
            
            // Add click event listener
            newItem.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const section = newItem.getAttribute('data-section');
                console.log('Navigation clicked:', section);
                
                if (section) {
                    this.navigateToSection(section);
                }
            });
        });

        // Setup mobile menu
        if (mobileMenuBtn && navMobile) {
            mobileMenuBtn.addEventListener('click', (e) => {
                e.preventDefault();
                navMobile.classList.toggle('show');
            });
        }

        console.log('Navigation setup completed');
    }

    navigateToSection(sectionId) {
        console.log('Navigating to section:', sectionId);
        
        try {
            // Hide all sections
            const sections = document.querySelectorAll('.section');
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Show target section
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.add('active');
                console.log('Successfully activated section:', sectionId);
                
                // Update navigation active states
                document.querySelectorAll('.nav-item').forEach(nav => {
                    nav.classList.remove('active');
                });
                document.querySelectorAll(`[data-section="${sectionId}"]`).forEach(nav => {
                    nav.classList.add('active');
                });
                
                // Close mobile menu if open
                const navMobile = document.getElementById('navMobile');
                if (navMobile) {
                    navMobile.classList.remove('show');
                }
                
                // Trigger specific rendering for certain sections
                this.handleSectionSpecificLogic(sectionId);
                
            } else {
                console.error('Section not found:', sectionId);
                this.showNotification(`Seção não encontrada: ${sectionId}`, 'error');
            }
        } catch (error) {
            console.error('Error navigating to section:', error);
            this.showNotification('Erro na navegação', 'error');
        }
    }

    handleSectionSpecificLogic(sectionId) {
        // Handle section-specific initialization
        switch(sectionId) {
            case 'agenda':
                setTimeout(() => this.renderCalendar(), 100);
                break;
            case 'relatorios':
                setTimeout(() => this.renderReports(), 100);
                break;
            case 'configuracoes':
                setTimeout(() => this.loadConfigurations(), 100);
                break;
            case 'orcamentos':
                // Ensure the budget table is rendered when navigating to budgets
                setTimeout(() => this.renderOrcamentosTable(), 100);
                break;
        }
    }

    // Modals
    setupModals() {
        console.log('Setting up modals...');
        
        // Make functions globally available
        window.openModal = (modalId) => {
            console.log('Opening modal:', modalId);
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.remove('hidden');
                if (modalId === 'orcamentoModal') {
                    this.setupOrcamentoModal();
                }
                this.populateSelects();
            } else {
                console.error('Modal not found:', modalId);
            }
        };

        window.closeModal = (modalId) => {
            console.log('Closing modal:', modalId);
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
        
        console.log('Modals setup completed');
    }

    resetForm(modalId) {
        const modal = document.getElementById(modalId);
        const form = modal.querySelector('form');
        if (form) form.reset();
        
        // Reset hidden ID fields
        const idField = modal.querySelector('input[type="hidden"]');
        if (idField) idField.value = '';
        
        // Reset orçamento items table
        if (modalId === 'orcamentoModal') {
            const tbody = document.getElementById('orcamentoItensTableBody');
            if (tbody) tbody.innerHTML = '';
            this.currentOrcamentoItems = [];
            this.updateOrcamentoTotals();
        }

        // Reset modal title
        const titleElement = modal.querySelector('.modal-header h3');
        if (titleElement) {
            const defaultTitles = {
                'clienteModal': 'Novo Cliente',
                'representadaModal': 'Nova Representada',
                'produtoModal': 'Novo Produto',
                'orcamentoModal': 'Novo Orçamento',
                'visitaModal': 'Nova Visita'
            };
            titleElement.textContent = defaultTitles[modalId] || 'Novo';
        }
    }

    // Forms
    setupForms() {
        console.log('Setting up forms...');
        
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

        // Orçamento Form
        const orcamentoForm = document.getElementById('orcamentoForm');
        if (orcamentoForm) {
            orcamentoForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveOrcamento();
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

        // Configurações Forms
        const configRepresentanteForm = document.getElementById('configRepresentanteForm');
        if (configRepresentanteForm) {
            configRepresentanteForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveConfigRepresentante();
            });
        }

        const configOrcamentoForm = document.getElementById('configOrcamentoForm');
        if (configOrcamentoForm) {
            configOrcamentoForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveConfigOrcamento();
            });
        }

        // Global functions for buttons
        window.addItemToOrcamento = () => this.addItemToOrcamento();
        window.removeItemFromOrcamento = (index) => this.removeItemFromOrcamento(index);
        window.previewOrcamento = () => this.previewOrcamento();
        window.gerarPDF = () => this.gerarPDF();
        window.gerarPDFFromPreview = () => this.gerarPDFFromPreview();
        
        console.log('Forms setup completed');
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
            contato: document.getElementById('clienteContato').value,
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
        document.getElementById('clienteEmail').value = cliente.email || '';
        document.getElementById('clienteEndereco').value = cliente.endereco || '';
        document.getElementById('clienteContato').value = cliente.contato || '';
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
        document.getElementById('representadaEmail').value = representada.email || '';
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

    // CRUD Operations - Orçamentos
    setupOrcamentoModal() {
        this.populateClienteSelects();
        this.populateProdutoSelects();
        document.getElementById('orcamentoData').value = this.formatDateForInput(new Date());
    }

    saveOrcamento() {
        const id = document.getElementById('orcamentoId').value;
        const cliente = document.getElementById('orcamentoCliente').value;

        if (!cliente) {
            this.showNotification('Selecione um cliente!', 'error');
            return;
        }

        if (this.currentOrcamentoItems.length === 0) {
            this.showNotification('Adicione pelo menos um item ao orçamento!', 'error');
            return;
        }

        const subtotal = this.calculateOrcamentoSubtotal();
        const descontoTotal = this.calculateOrcamentoDesconto();
        const total = subtotal - descontoTotal;
        const comissao = this.calculateOrcamentoComissao();
        
        const dataOrcamento = new Date(document.getElementById('orcamentoData').value);
        const validadeDias = this.data.configuracoes.orcamento?.validadeOrcamento || 30;
        const dataValidade = new Date(dataOrcamento);
        dataValidade.setDate(dataValidade.getDate() + validadeDias);

        const orcamento = {
            id: id ? parseInt(id) : Date.now(),
            numero: id ? this.data.orcamentos.find(o => o.id == id)?.numero : `ORÇ-2025-${String(this.nextOrcamentoNumber).padStart(3, '0')}`,
            cliente: cliente,
            data: document.getElementById('orcamentoData').value,
            validade: this.formatDateForInput(dataValidade),
            status: document.getElementById('orcamentoStatus').value,
            subtotal: subtotal,
            desconto: descontoTotal,
            total: total,
            comissao: comissao,
            observacoes: document.getElementById('orcamentoObservacoes').value,
            itens: [...this.currentOrcamentoItems]
        };

        if (id) {
            const index = this.data.orcamentos.findIndex(o => o.id == id);
            this.data.orcamentos[index] = orcamento;
        } else {
            this.data.orcamentos.push(orcamento);
            this.nextOrcamentoNumber++;
        }

        this.saveData();
        this.renderOrcamentosTable();
        this.updateMetrics();
        this.renderDashboard();
        window.closeModal('orcamentoModal');
        this.showNotification('Orçamento salvo com sucesso!', 'success');
    }

    addItemToOrcamento() {
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
        const existingItemIndex = this.currentOrcamentoItems.findIndex(item => item.produto === produto.descricao);
        
        if (existingItemIndex >= 0) {
            // Update existing item
            this.currentOrcamentoItems[existingItemIndex].quantidade += quantidade;
            this.currentOrcamentoItems[existingItemIndex].desconto = desconto;
        } else {
            // Add new item
            this.currentOrcamentoItems.push({
                codigo: produto.codigo,
                produto: produto.descricao,
                quantidade: quantidade,
                precoUnitario: produto.preco,
                desconto: desconto,
                total: produto.preco * quantidade * (1 - desconto/100)
            });
        }

        this.renderOrcamentoItemsTable();
        this.updateOrcamentoTotals();

        // Reset form
        produtoSelect.value = '';
        document.getElementById('itemQuantidade').value = '1';
        document.getElementById('itemDesconto').value = '0';
    }

    renderOrcamentoItemsTable() {
        const tableBody = document.getElementById('orcamentoItensTableBody');
        if (!tableBody) return;
        
        tableBody.innerHTML = '';

        this.currentOrcamentoItems.forEach((item, index) => {
            const subtotalItem = item.precoUnitario * item.quantidade;
            const descontoValor = subtotalItem * (item.desconto / 100);
            const total = subtotalItem - descontoValor;
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.codigo}</td>
                <td>${item.produto}</td>
                <td>${item.quantidade}</td>
                <td>R$ ${this.formatCurrency(item.precoUnitario)}</td>
                <td>${item.desconto}%</td>
                <td>R$ ${this.formatCurrency(total)}</td>
                <td><button type="button" class="btn-sm btn-delete" onclick="sgc.removeItemFromOrcamento(${index})">Remover</button></td>
            `;
            tableBody.appendChild(row);
        });
    }

    removeItemFromOrcamento(index) {
        this.currentOrcamentoItems.splice(index, 1);
        this.renderOrcamentoItemsTable();
        this.updateOrcamentoTotals();
    }

    updateOrcamentoTotals() {
        const subtotal = this.calculateOrcamentoSubtotal();
        const descontoTotal = this.calculateOrcamentoDesconto();
        const total = subtotal - descontoTotal;
        const comissao = this.calculateOrcamentoComissao();

        const subtotalEl = document.getElementById('orcamentoSubtotal');
        const descontoEl = document.getElementById('orcamentoDescontoTotal');
        const totalEl = document.getElementById('orcamentoTotal');
        const comissaoEl = document.getElementById('orcamentoComissaoTotal');

        if (subtotalEl) subtotalEl.textContent = `R$ ${this.formatCurrency(subtotal)}`;
        if (descontoEl) descontoEl.textContent = `R$ ${this.formatCurrency(descontoTotal)}`;
        if (totalEl) totalEl.textContent = `R$ ${this.formatCurrency(total)}`;
        if (comissaoEl) comissaoEl.textContent = `R$ ${this.formatCurrency(comissao)}`;
    }

    calculateOrcamentoSubtotal() {
        return this.currentOrcamentoItems.reduce((total, item) => {
            return total + (item.precoUnitario * item.quantidade);
        }, 0);
    }

    calculateOrcamentoDesconto() {
        return this.currentOrcamentoItems.reduce((totalDesconto, item) => {
            const subtotalItem = item.precoUnitario * item.quantidade;
            return totalDesconto + (subtotalItem * (item.desconto / 100));
        }, 0);
    }

    calculateOrcamentoComissao() {
        let comissaoTotal = 0;
        
        this.currentOrcamentoItems.forEach(item => {
            const produto = this.data.produtos.find(p => p.descricao === item.produto);
            if (produto) {
                const representada = this.data.representadas.find(r => r.nome === produto.representada);
                if (representada) {
                    const valorItem = item.precoUnitario * item.quantidade * (1 - item.desconto/100);
                    comissaoTotal += valorItem * (representada.comissao / 100);
                }
            }
        });

        return comissaoTotal;
    }

    editOrcamento(id) {
        const orcamento = this.data.orcamentos.find(o => o.id == id);
        if (!orcamento) return;

        document.getElementById('orcamentoId').value = orcamento.id;
        document.getElementById('orcamentoCliente').value = orcamento.cliente;
        document.getElementById('orcamentoData').value = orcamento.data;
        document.getElementById('orcamentoStatus').value = orcamento.status;
        document.getElementById('orcamentoObservacoes').value = orcamento.observacoes || '';

        // Load items
        this.currentOrcamentoItems = [...orcamento.itens];
        this.renderOrcamentoItemsTable();
        this.updateOrcamentoTotals();

        document.getElementById('orcamentoModalTitle').textContent = 'Editar Orçamento';
        window.openModal('orcamentoModal');
    }

    deleteOrcamento(id) {
        if (confirm('Tem certeza que deseja excluir este orçamento?')) {
            this.data.orcamentos = this.data.orcamentos.filter(o => o.id != id);
            this.saveData();
            this.renderOrcamentosTable();
            this.updateMetrics();
            this.renderDashboard();
            this.showNotification('Orçamento excluído com sucesso!', 'success');
        }
    }

    // PDF and Preview Functions
    previewOrcamento() {
        const cliente = document.getElementById('orcamentoCliente').value;
        if (!cliente || this.currentOrcamentoItems.length === 0) {
            this.showNotification('Configure o cliente e adicione itens ao orçamento!', 'error');
            return;
        }

        this.generatePreview();
        window.openModal('previewModal');
    }

    generatePreview() {
        const cliente = this.data.clientes.find(c => c.nome === document.getElementById('orcamentoCliente').value);
        const config = this.data.configuracoes;
        
        const dataOrcamento = new Date(document.getElementById('orcamentoData').value);
        const validadeDias = config.orcamento?.validadeOrcamento || 30;
        const dataValidade = new Date(dataOrcamento);
        dataValidade.setDate(dataValidade.getDate() + validadeDias);

        const subtotal = this.calculateOrcamentoSubtotal();
        const descontoTotal = this.calculateOrcamentoDesconto();
        const total = subtotal - descontoTotal;

        const previewContent = document.getElementById('previewContent');
        if (!previewContent) return;
        
        previewContent.innerHTML = `
            <div class="header-section">
                <div class="company-info">
                    <h1>${config.representante?.nome || 'Representação Comercial'}</h1>
                    <p><strong>CNPJ:</strong> ${config.representante?.cnpj || 'Não informado'}</p>
                    <p><strong>Endereço:</strong> ${config.representante?.endereco || 'Não informado'}</p>
                    <p><strong>Telefone:</strong> ${config.representante?.telefone || 'Não informado'}</p>
                    <p><strong>Email:</strong> ${config.representante?.email || 'Não informado'}</p>
                </div>
                <div class="orcamento-info">
                    <h2>ORÇAMENTO</h2>
                    <p><strong>Número:</strong> ORÇ-2025-${String(this.nextOrcamentoNumber).padStart(3, '0')}</p>
                    <p><strong>Data:</strong> ${this.formatDate(document.getElementById('orcamentoData').value)}</p>
                    <p><strong>Validade:</strong> ${this.formatDate(this.formatDateForInput(dataValidade))}</p>
                </div>
            </div>

            <div class="client-section">
                <h3>DADOS DO CLIENTE</h3>
                <p><strong>Razão Social:</strong> ${cliente?.nome || 'Cliente não encontrado'}</p>
                <p><strong>CNPJ/CPF:</strong> ${cliente?.cnpj || 'Não informado'}</p>
                <p><strong>Endereço:</strong> ${cliente?.endereco || 'Não informado'}</p>
                <p><strong>Telefone:</strong> ${cliente?.telefone || 'Não informado'}</p>
                <p><strong>Email:</strong> ${cliente?.email || 'Não informado'}</p>
                ${cliente?.contato ? `<p><strong>Contato:</strong> ${cliente.contato}</p>` : ''}
            </div>

            <div class="items-section">
                <h3>ITENS DO ORÇAMENTO</h3>
                <table class="items-table">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Descrição</th>
                            <th>Qtd</th>
                            <th>Preço Unit.</th>
                            <th>Desconto</th>
                            <th class="text-right">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.currentOrcamentoItems.map(item => {
                            const subtotalItem = item.precoUnitario * item.quantidade;
                            const descontoValor = subtotalItem * (item.desconto / 100);
                            const totalItem = subtotalItem - descontoValor;
                            return `
                                <tr>
                                    <td>${item.codigo}</td>
                                    <td>${item.produto}</td>
                                    <td>${item.quantidade}</td>
                                    <td>R$ ${this.formatCurrency(item.precoUnitario)}</td>
                                    <td>${item.desconto}%</td>
                                    <td class="text-right">R$ ${this.formatCurrency(totalItem)}</td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>

            <div class="totals-section">
                <table class="totals-table">
                    <tr>
                        <td><strong>Subtotal:</strong></td>
                        <td class="text-right">R$ ${this.formatCurrency(subtotal)}</td>
                    </tr>
                    <tr>
                        <td><strong>Desconto Total:</strong></td>
                        <td class="text-right">R$ ${this.formatCurrency(descontoTotal)}</td>
                    </tr>
                    <tr class="total-final">
                        <td><strong>TOTAL GERAL:</strong></td>
                        <td class="text-right"><strong>R$ ${this.formatCurrency(total)}</strong></td>
                    </tr>
                </table>
            </div>

            <div class="footer-section">
                <div class="footer-info">
                    <div>
                        <h4>Condições de Pagamento</h4>
                        <p>${config.orcamento?.condicoesPagamento || '30 dias após entrega'}</p>
                        
                        <h4>Prazo de Entrega</h4>
                        <p>${config.orcamento?.prazoEntrega || '15 dias úteis'}</p>
                    </div>
                    <div>
                        <h4>Validade da Proposta</h4>
                        <p>${validadeDias} dias</p>
                        
                        <h4>Contato</h4>
                        <p>${config.representante?.telefone || 'Não informado'}</p>
                        <p>${config.representante?.email || 'Não informado'}</p>
                    </div>
                </div>
                
                ${(document.getElementById('orcamentoObservacoes').value || config.orcamento?.observacoesPadrao) ? `
                    <div class="observations">
                        <h4>Observações</h4>
                        <p>${document.getElementById('orcamentoObservacoes').value || config.orcamento?.observacoesPadrao || ''}</p>
                    </div>
                ` : ''}
            </div>
        `;
    }

    gerarPDF() {
        const cliente = document.getElementById('orcamentoCliente').value;
        if (!cliente || this.currentOrcamentoItems.length === 0) {
            this.showNotification('Configure o cliente e adicione itens ao orçamento!', 'error');
            return;
        }

        this.createPDF();
    }

    gerarPDFFromPreview() {
        this.createPDF();
        window.closeModal('previewModal');
    }

    createPDF() {
        // Check if jsPDF is available
        if (typeof window.jspdf === 'undefined') {
            this.showNotification('Biblioteca jsPDF não carregada. Recarregue a página.', 'error');
            return;
        }

        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF();
        
        const cliente = this.data.clientes.find(c => c.nome === document.getElementById('orcamentoCliente').value);
        const config = this.data.configuracoes;
        
        const dataOrcamento = new Date(document.getElementById('orcamentoData').value);
        const validadeDias = config.orcamento?.validadeOrcamento || 30;
        const dataValidade = new Date(dataOrcamento);
        dataValidade.setDate(dataValidade.getDate() + validadeDias);

        const subtotal = this.calculateOrcamentoSubtotal();
        const descontoTotal = this.calculateOrcamentoDesconto();
        const total = subtotal - descontoTotal;
        
        const numeroOrcamento = `ORÇ-2025-${String(this.nextOrcamentoNumber).padStart(3, '0')}`;

        // Define colors
        const primaryColor = [31, 128, 141]; // Teal
        const textColor = [51, 51, 51];
        const lightGray = [245, 245, 245];
        
        let yPosition = 20;

        // Header - Company Info
        pdf.setFontSize(24);
        pdf.setTextColor(...primaryColor);
        pdf.setFont(undefined, 'bold');
        pdf.text(config.representante?.nome || 'Representação Comercial', 20, yPosition);
        
        yPosition += 10;
        pdf.setFontSize(10);
        pdf.setTextColor(...textColor);
        pdf.setFont(undefined, 'normal');
        
        if (config.representante?.cnpj) {
            pdf.text(`CNPJ: ${config.representante.cnpj}`, 20, yPosition);
            yPosition += 5;
        }
        if (config.representante?.endereco) {
            pdf.text(`${config.representante.endereco}`, 20, yPosition);
            yPosition += 5;
        }
        if (config.representante?.telefone) {
            pdf.text(`Tel: ${config.representante.telefone}`, 20, yPosition);
            yPosition += 5;
        }
        if (config.representante?.email) {
            pdf.text(`Email: ${config.representante.email}`, 20, yPosition);
            yPosition += 5;
        }

        // Orçamento Info - Right side
        pdf.setFontSize(18);
        pdf.setTextColor(...primaryColor);
        pdf.setFont(undefined, 'bold');
        pdf.text('ORÇAMENTO', 140, 30);
        
        pdf.setFontSize(10);
        pdf.setTextColor(...textColor);
        pdf.setFont(undefined, 'normal');
        pdf.text(`Número: ${numeroOrcamento}`, 140, 40);
        pdf.text(`Data: ${this.formatDate(document.getElementById('orcamentoData').value)}`, 140, 45);
        pdf.text(`Validade: ${this.formatDate(this.formatDateForInput(dataValidade))}`, 140, 50);

        // Line separator
        yPosition = 60;
        pdf.setDrawColor(...primaryColor);
        pdf.setLineWidth(0.5);
        pdf.line(20, yPosition, 190, yPosition);

        // Client Info
        yPosition += 10;
        pdf.setFontSize(12);
        pdf.setTextColor(...primaryColor);
        pdf.setFont(undefined, 'bold');
        pdf.text('DADOS DO CLIENTE', 20, yPosition);
        
        yPosition += 8;
        pdf.setFontSize(10);
        pdf.setTextColor(...textColor);
        pdf.setFont(undefined, 'normal');
        
        if (cliente?.nome) {
            pdf.text(`Razão Social: ${cliente.nome}`, 20, yPosition);
            yPosition += 5;
        }
        if (cliente?.cnpj) {
            pdf.text(`CNPJ/CPF: ${cliente.cnpj}`, 20, yPosition);
            yPosition += 5;
        }
        if (cliente?.endereco) {
            pdf.text(`Endereço: ${cliente.endereco}`, 20, yPosition);
            yPosition += 5;
        }
        if (cliente?.telefone) {
            pdf.text(`Telefone: ${cliente.telefone}`, 20, yPosition);
            yPosition += 5;
        }
        if (cliente?.email) {
            pdf.text(`Email: ${cliente.email}`, 20, yPosition);
            yPosition += 5;
        }
        if (cliente?.contato) {
            pdf.text(`Contato: ${cliente.contato}`, 20, yPosition);
            yPosition += 5;
        }

        // Items Table
        yPosition += 10;
        pdf.setFontSize(12);
        pdf.setTextColor(...primaryColor);
        pdf.setFont(undefined, 'bold');
        pdf.text('ITENS DO ORÇAMENTO', 20, yPosition);
        
        yPosition += 10;
        
        // Table header
        const tableHeaders = ['Código', 'Descrição', 'Qtd', 'Preço Unit.', 'Desc.', 'Total'];
        const colWidths = [20, 70, 15, 25, 15, 25];
        let xPosition = 20;
        
        pdf.setFillColor(...lightGray);
        pdf.rect(xPosition, yPosition - 5, 170, 8, 'F');
        
        pdf.setFontSize(9);
        pdf.setTextColor(...textColor);
        pdf.setFont(undefined, 'bold');
        
        tableHeaders.forEach((header, index) => {
            pdf.text(header, xPosition + 2, yPosition);
            xPosition += colWidths[index];
        });
        
        yPosition += 8;
        
        // Table rows
        pdf.setFont(undefined, 'normal');
        this.currentOrcamentoItems.forEach(item => {
            if (yPosition > 250) { // New page if needed
                pdf.addPage();
                yPosition = 20;
            }
            
            xPosition = 20;
            const subtotalItem = item.precoUnitario * item.quantidade;
            const descontoValor = subtotalItem * (item.desconto / 100);
            const totalItem = subtotalItem - descontoValor;
            
            const rowData = [
                item.codigo,
                item.produto.substring(0, 35), // Truncate long descriptions
                item.quantidade.toString(),
                `R$ ${this.formatCurrency(item.precoUnitario)}`,
                `${item.desconto}%`,
                `R$ ${this.formatCurrency(totalItem)}`
            ];
            
            rowData.forEach((data, index) => {
                if (index === 5) { // Right align total
                    pdf.text(data, xPosition + colWidths[index] - 2, yPosition, { align: 'right' });
                } else {
                    pdf.text(data, xPosition + 2, yPosition);
                }
                xPosition += colWidths[index];
            });
            
            yPosition += 6;
        });

        // Totals
        yPosition += 10;
        const totalsX = 140;
        
        pdf.setFont(undefined, 'normal');
        pdf.text('Subtotal:', totalsX, yPosition);
        pdf.text(`R$ ${this.formatCurrency(subtotal)}`, totalsX + 50, yPosition, { align: 'right' });
        
        yPosition += 6;
        pdf.text('Desconto Total:', totalsX, yPosition);
        pdf.text(`R$ ${this.formatCurrency(descontoTotal)}`, totalsX + 50, yPosition, { align: 'right' });
        
        yPosition += 8;
        pdf.setFont(undefined, 'bold');
        pdf.setTextColor(...primaryColor);
        pdf.text('TOTAL GERAL:', totalsX, yPosition);
        pdf.text(`R$ ${this.formatCurrency(total)}`, totalsX + 50, yPosition, { align: 'right' });

        // Footer
        yPosition += 15;
        if (yPosition > 240) {
            pdf.addPage();
            yPosition = 20;
        }
        
        pdf.setDrawColor(...primaryColor);
        pdf.line(20, yPosition, 190, yPosition);
        
        yPosition += 10;
        pdf.setFontSize(10);
        pdf.setTextColor(...textColor);
        pdf.setFont(undefined, 'bold');
        
        // Two columns for conditions
        pdf.text('Condições de Pagamento:', 20, yPosition);
        pdf.text('Prazo de Entrega:', 110, yPosition);
        
        yPosition += 6;
        pdf.setFont(undefined, 'normal');
        pdf.text(config.orcamento?.condicoesPagamento || '30 dias após entrega', 20, yPosition);
        pdf.text(config.orcamento?.prazoEntrega || '15 dias úteis', 110, yPosition);
        
        yPosition += 8;
        pdf.setFont(undefined, 'bold');
        pdf.text('Validade da Proposta:', 20, yPosition);
        pdf.text('Contato:', 110, yPosition);
        
        yPosition += 6;
        pdf.setFont(undefined, 'normal');
        pdf.text(`${validadeDias} dias`, 20, yPosition);
        pdf.text(`${config.representante?.telefone || 'N/A'} - ${config.representante?.email || 'N/A'}`, 110, yPosition);

        // Observations
        const observacoes = document.getElementById('orcamentoObservacoes').value || config.orcamento?.observacoesPadrao;
        if (observacoes) {
            yPosition += 10;
            pdf.setFont(undefined, 'bold');
            pdf.text('Observações:', 20, yPosition);
            
            yPosition += 6;
            pdf.setFont(undefined, 'normal');
            const splitObservacoes = pdf.splitTextToSize(observacoes, 170);
            pdf.text(splitObservacoes, 20, yPosition);
        }

        // Save PDF
        const clienteNome = cliente?.nome?.replace(/[^\w\s]/gi, '').replace(/\s+/g, '_') || 'Cliente';
        const fileName = `Orcamento_${numeroOrcamento}_${clienteNome}.pdf`;
        
        pdf.save(fileName);
        this.showNotification('PDF gerado com sucesso!', 'success');
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
        document.getElementById('visitaObservacoes').value = visita.observacoes || '';

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

    // Configuration Functions
    loadConfigurations() {
        const config = this.data.configuracoes;
        
        // Representante config
        const nomeEmpresa = document.getElementById('configNomeEmpresa');
        const cnpj = document.getElementById('configCnpj');
        const endereco = document.getElementById('configEndereco');
        const telefone = document.getElementById('configTelefone');
        const email = document.getElementById('configEmail');
        
        if (config.representante) {
            if (nomeEmpresa) nomeEmpresa.value = config.representante.nome || '';
            if (cnpj) cnpj.value = config.representante.cnpj || '';
            if (endereco) endereco.value = config.representante.endereco || '';
            if (telefone) telefone.value = config.representante.telefone || '';
            if (email) email.value = config.representante.email || '';
        }

        // Orcamento config
        const condicoesPagamento = document.getElementById('configCondicoesPagamento');
        const prazoEntrega = document.getElementById('configPrazoEntrega');
        const validadeOrcamento = document.getElementById('configValidadeOrcamento');
        const observacoesPadrao = document.getElementById('configObservacoesPadrao');
        
        if (config.orcamento) {
            if (condicoesPagamento) condicoesPagamento.value = config.orcamento.condicoesPagamento || '';
            if (prazoEntrega) prazoEntrega.value = config.orcamento.prazoEntrega || '';
            if (validadeOrcamento) validadeOrcamento.value = config.orcamento.validadeOrcamento || 30;
            if (observacoesPadrao) observacoesPadrao.value = config.orcamento.observacoesPadrao || '';
        }
    }

    saveConfigRepresentante() {
        if (!this.data.configuracoes.representante) {
            this.data.configuracoes.representante = {};
        }

        this.data.configuracoes.representante = {
            nome: document.getElementById('configNomeEmpresa').value,
            cnpj: document.getElementById('configCnpj').value,
            endereco: document.getElementById('configEndereco').value,
            telefone: document.getElementById('configTelefone').value,
            email: document.getElementById('configEmail').value
        };

        this.saveData();
        this.showNotification('Dados do representante salvos com sucesso!', 'success');
    }

    saveConfigOrcamento() {
        if (!this.data.configuracoes.orcamento) {
            this.data.configuracoes.orcamento = {};
        }

        this.data.configuracoes.orcamento = {
            condicoesPagamento: document.getElementById('configCondicoesPagamento').value,
            prazoEntrega: document.getElementById('configPrazoEntrega').value,
            validadeOrcamento: parseInt(document.getElementById('configValidadeOrcamento').value) || 30,
            observacoesPadrao: document.getElementById('configObservacoesPadrao').value
        };

        this.saveData();
        this.showNotification('Configurações de orçamento salvas com sucesso!', 'success');
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

        // Calculate current month sales from approved budgets
        const vendasMes = this.data.orcamentos
            .filter(o => {
                const dataOrcamento = new Date(o.data);
                return dataOrcamento.getMonth() === mesAtual && 
                       dataOrcamento.getFullYear() === anoAtual &&
                       o.status === 'aprovado';
            })
            .reduce((total, o) => total + o.total, 0);

        // Count pending budgets
        const orcamentosPendentes = this.data.orcamentos.filter(o => o.status === 'rascunho' || o.status === 'enviado').length;

        // Count active clients
        const clientesAtivos = this.data.clientes.filter(c => c.status === 'ativo').length;

        // Calculate commission to receive
        const comissaoAReceber = this.data.orcamentos
            .filter(o => o.status === 'aprovado')
            .reduce((total, o) => total + o.comissao, 0);

        this.data.metricas = {
            vendasMes,
            orcamentosPendentes,
            clientesAtivos,
            comissaoAReceber,
            metaMensal: 50000.00
        };

        this.saveData();
    }

    renderMetricCards() {
        const vendasMesEl = document.getElementById('vendasMes');
        const orcamentosPendentesEl = document.getElementById('orcamentosPendentes');
        const clientesAtivosEl = document.getElementById('clientesAtivos');
        const comissaoAReceberEl = document.getElementById('comissaoAReceber');

        if (vendasMesEl) vendasMesEl.textContent = `R$ ${this.formatCurrency(this.data.metricas.vendasMes)}`;
        if (orcamentosPendentesEl) orcamentosPendentesEl.textContent = this.data.metricas.orcamentosPendentes;
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
            
            const vendas = this.data.orcamentos
                .filter(o => {
                    const dataOrcamento = new Date(o.data);
                    return dataOrcamento.getMonth() === data_mes.getMonth() &&
                           dataOrcamento.getFullYear() === data_mes.getFullYear() &&
                           o.status === 'aprovado';
                })
                .reduce((total, o) => total + o.total, 0);
            
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

        // Check for expired budgets
        this.data.orcamentos.forEach(orcamento => {
            const hoje = new Date();
            const dataValidade = new Date(orcamento.validade);
            if (dataValidade < hoje && orcamento.status === 'enviado') {
                const alert = document.createElement('div');
                alert.className = 'alert-item error';
                alert.innerHTML = `
                    <strong>Orçamento Expirado:</strong><br>
                    ${orcamento.numero} - ${orcamento.cliente}
                `;
                alertsList.appendChild(alert);
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
        this.renderOrcamentosTable();
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

    renderOrcamentosTable() {
        const tbody = document.getElementById('orcamentosTableBody');
        if (!tbody) return;
        
        tbody.innerHTML = '';

        this.data.orcamentos.forEach(orcamento => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${orcamento.numero}</td>
                <td>${orcamento.cliente}</td>
                <td>${this.formatDate(orcamento.data)}</td>
                <td>${this.formatDate(orcamento.validade)}</td>
                <td><span class="status-badge ${orcamento.status}">${orcamento.status}</span></td>
                <td>R$ ${this.formatCurrency(orcamento.total)}</td>
                <td>R$ ${this.formatCurrency(orcamento.comissao)}</td>
                <td class="action-buttons">
                    <button class="btn-sm btn-edit" onclick="sgc.editOrcamento(${orcamento.id})">Editar</button>
                    <button class="btn-sm btn-pdf" onclick="sgc.gerarPDFOrcamento(${orcamento.id})">📄 PDF</button>
                    <button class="btn-sm btn-delete" onclick="sgc.deleteOrcamento(${orcamento.id})">Excluir</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    gerarPDFOrcamento(id) {
        const orcamento = this.data.orcamentos.find(o => o.id == id);
        if (!orcamento) return;

        // Temporarily set current items for PDF generation
        this.currentOrcamentoItems = [...orcamento.itens];
        
        // Set form values
        const clienteEl = document.getElementById('orcamentoCliente');
        const dataEl = document.getElementById('orcamentoData');
        const obsEl = document.getElementById('orcamentoObservacoes');
        
        if (clienteEl) clienteEl.value = orcamento.cliente;
        if (dataEl) dataEl.value = orcamento.data;
        if (obsEl) obsEl.value = orcamento.observacoes || '';
        
        // Override the next number for existing budget
        const originalNext = this.nextOrcamentoNumber;
        this.nextOrcamentoNumber = parseInt(orcamento.numero.split('-')[2]);
        
        this.createPDF();
        
        // Restore original
        this.nextOrcamentoNumber = originalNext;
        this.currentOrcamentoItems = [];
    }

    // Populate Selects
    populateSelects() {
        this.populateClienteSelects();
        this.populateRepresentadaSelects();
        this.populateProdutoSelects();
    }

    populateClienteSelects() {
        const selects = ['orcamentoCliente', 'visitaCliente'];
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
                const visitaDataEl = document.getElementById('visitaData');
                if (visitaDataEl) visitaDataEl.value = dateString;
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
            
            const vendas = this.data.orcamentos
                .filter(o => {
                    const dataOrcamento = new Date(o.data);
                    return dataOrcamento.getMonth() === data_mes.getMonth() &&
                           dataOrcamento.getFullYear() === data_mes.getFullYear() &&
                           o.status === 'aprovado';
                })
                .reduce((total, o) => total + o.total, 0);
            
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

        // Get top products from budgets
        const produtoVendas = {};
        this.data.orcamentos.forEach(orcamento => {
            if (orcamento.status === 'aprovado') {
                orcamento.itens.forEach(item => {
                    produtoVendas[item.produto] = (produtoVendas[item.produto] || 0) + (item.quantidade * item.precoUnitario);
                });
            }
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
        this.data.orcamentos.forEach(orcamento => {
            if (orcamento.status === 'aprovado') {
                orcamento.itens.forEach(item => {
                    const produto = this.data.produtos.find(p => p.descricao === item.produto);
                    if (produto) {
                        const representada = this.data.representadas.find(r => r.nome === produto.representada);
                        if (representada) {
                            const comissao = item.precoUnitario * item.quantidade * (representada.comissao / 100);
                            comissoesPorRep[representada.nome] = (comissoesPorRep[representada.nome] || 0) + comissao;
                        }
                    }
                });
            }
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

        // Orçamento filters
        const searchOrcamentos = document.getElementById('searchOrcamentos');
        if (searchOrcamentos) {
            searchOrcamentos.addEventListener('input', (e) => {
                this.filterTable('orcamentosTableBody', e.target.value, [0, 1]); // Number and Client
            });
        }

        const filterStatusOrcamento = document.getElementById('filterStatusOrcamento');
        if (filterStatusOrcamento) {
            filterStatusOrcamento.addEventListener('change', (e) => {
                this.filterTable('orcamentosTableBody', e.target.value, 4, true);
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
        if (window.sgc) {
            window.sgc.showNotification('Selecione as datas de início e fim', 'error');
        }
        return;
    }
    
    if (window.sgc) {
        window.sgc.showNotification('Relatório gerado com sucesso!', 'success');
    }
};

// Initialize the system
let sgc;

// Multiple initialization approaches to ensure it works
document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM loaded, initializing SGC...');
    try {
        sgc = new SGC();
        await sgc.init();
        
        // Make sgc available globally for onclick handlers
        window.sgc = sgc;
        
        console.log('SGC successfully initialized and available globally');
    } catch (error) {
        console.error('Error initializing SGC:', error);
    }
});

// Fallback initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', async () => {
        if (!sgc) {
            console.log('Fallback initialization...');
            sgc = new SGC();
            await sgc.init();
            window.sgc = sgc;
        }
    });
} else {
    // DOM already loaded
    setTimeout(async () => {
        if (!sgc) {
            console.log('Immediate initialization...');
            sgc = new SGC();
            await sgc.init();
            window.sgc = sgc;
        }
    }, 100);
}