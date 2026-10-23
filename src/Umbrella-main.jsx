import { useEffect, useState } from 'react'
import {
    BrowserRouter,
    Link,
    NavLink,
    Route,
    Routes,
    useLocation,
    useNavigate,
    useSearchParams,
} from 'react-router-dom'
import './Umbrella-main.css'

const researchAreas = [
    {
        title: 'Terapia gênica',
        description: 'Tratamentos de precisão para um amanhã mais saudável.',
        image: '/ChatGPT Image 8 de out. de 2026, 19_51_15.png',
        alt: 'Hélice de DNA representando pesquisas em terapia gênica',
        icon: 'dna',
    },
    {
        title: 'Vacinas e imunoterapia',
        description: 'Fortalecendo a saúde global com soluções avançadas.',
        image: '/ChatGPT Image 8 de out. de 2026, 19_50_04.png',
        alt: 'Cientista analisando uma amostra em um microscópio',
        icon: 'capsule',
    },
    {
        title: 'Biotecnologia sustentável',
        description: 'Inovação por um planeta mais limpo e resiliente.',
        image: 'photo-1501004318641-b39e6451bec6',
        alt: 'Plantas verdes crescendo sob a luz do sol',
        icon: 'leaf',
    },
    {
        title: 'Neurociência',
        description: 'Desvendando o potencial da mente humana.',
        image: 'photo-1559757175-0eb30cd8c063',
        alt: 'Imagem científica relacionada à saúde e ao cérebro',
        icon: 'brain',
    },
]

const photoUrl = (id, width = 900) =>
    id.startsWith('/')
        ? encodeURI(id)
        : `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`

const navItems = [
    { label: 'Início', to: '/', end: true },
    { label: 'Sobre', to: '/sobre' },
    { label: 'Pesquisa', to: '/pesquisa' },
    { label: 'Carreiras', to: '/carreiras' },
    { label: 'Notícias', to: '/noticias' },
    { label: 'Contato', to: '/contato' },
]

const pageTitles = {
    '/': 'Início',
    '/sobre': 'Sobre',
    '/pesquisa': 'Pesquisa',
    '/carreiras': 'Carreiras',
    '/noticias': 'Notícias',
    '/contato': 'Contato',
}

function UmbrellaMark() {
    return (
        <svg className="umbrella-mark" viewBox="0 0 48 48" aria-hidden="true">
            <path d="M24 24 15.5 1.5Q24 5 32.5 1.5Z" fill="#c8101e" />
            <path d="M24 24 32.5 1.5Q38 9 46.5 15.5Z" fill="#f5f5f5" />
            <path d="M24 24 46.5 15.5Q43 24 46.5 32.5Z" fill="#c8101e" />
            <path d="M24 24 46.5 32.5Q38 39 32.5 46.5Z" fill="#f5f5f5" />
            <path d="M24 24 32.5 46.5Q24 43 15.5 46.5Z" fill="#c8101e" />
            <path d="M24 24 15.5 46.5Q10 39 1.5 32.5Z" fill="#f5f5f5" />
            <path d="M24 24 1.5 32.5Q5 24 1.5 15.5Z" fill="#c8101e" />
            <path d="M24 24 1.5 15.5Q10 9 15.5 1.5Z" fill="#f5f5f5" />
            <path d="M15.5 1.5Q24 5 32.5 1.5Q38 9 46.5 15.5Q43 24 46.5 32.5Q38 39 32.5 46.5Q24 43 15.5 46.5Q10 39 1.5 32.5Q5 24 1.5 15.5Q10 9 15.5 1.5Z" fill="none" stroke="#b7b7b7" strokeWidth=".8" />
            <path d="M24 24 15.5 1.5M24 24 32.5 1.5M24 24 46.5 15.5M24 24 46.5 32.5M24 24 32.5 46.5M24 24 15.5 46.5M24 24 1.5 32.5M24 24 1.5 15.5" stroke="#d0d0d0" strokeWidth=".75" />
        </svg>
    )
}

function AreaIcon({ name }) {
    const shared = {
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 1.7,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
    }

    const paths = {
        dna: <><path d="M8 3c0 5 8 5 8 10s-8 5-8 10" /><path d="M16 3c0 5-8 5-8 10s8 5 8 10M8.5 7h7M8.5 19h7M9 12h6" /></>,
        capsule: <><path d="m7 17 10-10a4.2 4.2 0 0 1 6 6L13 23a4.2 4.2 0 0 1-6-6Z" /><path d="m11 13 6 6" /></>,
        leaf: <><path d="M22 3C12 3 5 6 5 14a7 7 0 0 0 7 7c8 0 10-9 10-18Z" /><path d="M3 22c4-6 8-9 14-12" /></>,
        brain: <><path d="M12 4a3 3 0 0 0-5-2 4 4 0 0 0-4 5 4 4 0 0 0 0 7 4 4 0 0 0 4 6 3 3 0 0 0 5-2Z" /><path d="M12 4a3 3 0 0 1 5-2 4 4 0 0 1 4 5 4 4 0 0 1 0 7 4 4 0 0 1-4 6 3 3 0 0 1-5-2ZM8 7c2 0 3 1 3 3M7 16c2 0 3-1 4-3m5-6c-2 0-3 1-3 3m4 6c-2 0-3-1-4-3" /></>,
    }

    return <svg viewBox="0 0 24 24" aria-hidden="true" {...shared}>{paths[name]}</svg>
}

function ArrowIcon() {
    return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10h13m-5-5 5 5-5 5" /></svg>
}

function SiteHeader() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const navigate = useNavigate()

    const closeMenu = () => setMenuOpen(false)
    const submitSearch = (event) => {
        event.preventDefault()
        const query = searchQuery.trim()
        if (!query) return
        navigate(`/pesquisa?q=${encodeURIComponent(query)}`)
        setSearchOpen(false)
        setSearchQuery('')
        closeMenu()
    }

    return (
        <header className="site-header">
            <Link className="brand" to="/" aria-label="Umbrella Corporation, início" onClick={closeMenu}>
                <UmbrellaMark />
                <span className="brand-name">UMBRELLA<span>CORPORATION</span></span>
                <span className="brand-divider" />
                <span className="brand-motto">Biotecnologia&nbsp; / &nbsp;Saúde&nbsp; / &nbsp;Um amanhã mais seguro</span>
            </Link>

            <button
                className="menu-toggle icon-button"
                type="button"
                aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(!menuOpen)}
            >
                <span /><span />
            </button>

            <nav className={`main-nav${menuOpen ? ' is-open' : ''}`} aria-label="Navegação principal">
                {navItems.map(({ label, to, end }) => (
                    <NavLink key={to} to={to} end={end} onClick={closeMenu}>{label}</NavLink>
                ))}
                <button
                    className="search-toggle icon-button"
                    type="button"
                    aria-label={searchOpen ? 'Fechar busca' : 'Abrir busca'}
                    aria-expanded={searchOpen}
                    onClick={() => setSearchOpen(!searchOpen)}
                >
                    <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.4" /><path d="m16 16 4.2 4.2" /></svg>
                </button>
            </nav>
            {searchOpen && (
                <form className="search-panel" role="search" onSubmit={submitSearch}>
                    <label htmlFor="site-search">Buscar pesquisas</label>
                    <input id="site-search" type="search" placeholder="O que você procura?" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} autoFocus />
                    <button type="submit" aria-label="Buscar"><ArrowIcon /></button>
                </form>
            )}
        </header>
    )
}

function SiteFooter() {
    return (
        <footer className="site-footer">
            <Link className="footer-brand" to="/" aria-label="Umbrella Corporation, voltar ao início"><UmbrellaMark /><span>UMBRELLA<small>CORPORATION</small></span></Link>
            <nav aria-label="Navegação do rodapé">
                {navItems.map(({ label, to }) => <Link key={to} to={to}>{label}</Link>)}
            </nav>
            <div className="social-links" aria-label="Redes sociais">
                <a href="https://www.linkedin.com/" aria-label="LinkedIn">in</a><a href="https://x.com/" aria-label="X">X</a><a href="https://www.youtube.com/" aria-label="YouTube">▶</a><a href="https://www.instagram.com/" aria-label="Instagram">◎</a>
            </div>
            <small className="copyright">© 2026 Umbrella Corporation. Todos os direitos reservados.</small>
        </footer>
    )
}

function ResearchCard({ area, index = 0 }) {
    return (
        <article className="research-card">
            <Link to="/pesquisa" className="card-image-link" aria-label={`Saiba mais sobre ${area.title}`}>
                <img src={photoUrl(area.image, 720)} alt={area.alt} loading={index === 0 ? 'eager' : 'lazy'} />
            </Link>
            <div className="card-content">
                <AreaIcon name={area.icon} />
                <h3>{area.title}</h3>
                <p>{area.description}</p>
                <Link className="text-link" to="/pesquisa">Saiba mais <ArrowIcon /></Link>
            </div>
        </article>
    )
}

function HomePage() {
    return (
        <main>
            <section className="hero" aria-labelledby="hero-title">
                <div className="hero-image" />
                <div className="hero-content">
                    <p className="eyebrow"><span /> Umbrella Corporation</p>
                    <h1 id="hero-title">Avançando a vida<br />por meio da <em>inovação</em></h1>
                    <p className="hero-copy">Somos uma empresa global de biotecnologia dedicada à excelência científica, à saúde humana e a um futuro mais sustentável. Transformamos possibilidades em progresso.</p>
                    <Link className="button button-red" to="/pesquisa">Conheça nossas pesquisas <ArrowIcon /></Link>
                </div>
                <p className="hero-side-note">Melhor ciência.<br />Pessoas mais saudáveis.<br />Um planeta mais forte.</p>
                <div className="hero-pagination" aria-hidden="true"><span /><i /><i /></div>
            </section>

            <section className="research-section" aria-labelledby="research-title">
                <div className="section-intro">
                    <p className="eyebrow"><span /> Nossas áreas de pesquisa</p>
                    <h2 id="research-title">Descobertas que<br />movem a biotecnologia</h2>
                    <p>De terapias de última geração a soluções sustentáveis, nossa pesquisa conecta disciplinas para gerar impacto no mundo real.</p>
                    <Link className="text-link" to="/pesquisa">Explore todas as pesquisas <ArrowIcon /></Link>
                </div>
                <div className="research-grid">
                    {researchAreas.map((area, index) => <ResearchCard area={area} index={index} key={area.title} />)}
                </div>
            </section>

            <section className="global-section" aria-labelledby="global-title">
                <div className="global-copy">
                    <p className="eyebrow"><span /> Presença global</p>
                    <h2 id="global-title">Um compromisso<br />com o mundo</h2>
                    <p>Nossas instalações, centros de pesquisa e equipes atuam em todo o planeta, levando ciência adiante em cada região.</p>
                    <Link className="text-link global-link" to="/sobre">Conheça a Umbrella <ArrowIcon /></Link>
                </div>
                <div className="world-map" role="img" aria-label="Mapa ilustrado das regiões onde a Umbrella atua">
                    <svg viewBox="0 0 560 240" aria-hidden="true">
                        <path d="m54 63 25-21 33 4 13 17 24 3 9 16-19 13-6 22-22 11-12 31-15-8-7-27-19-16-3-19-18-10zm115 91 20 9 9 24-14 28-11-14-4-24zm51-104 24-18 33 9 12 17 26 1 13 17-9 18-30 1-10 18-23-5-8 20-19-10-8-24-17-13zm89 73 25-15 19 10 4 20-21 12-22-9zm56-75 25-16 46 2 18 15 31 2 20 22-12 17-27-7-17 13-24-10-17 11-25-7-12-19-23-4zM390 144l18-9 13 16-9 24-15-5z" />
                        <g className="map-points"><circle cx="102" cy="74" r="3" /><circle cx="133" cy="103" r="3" /><circle cx="189" cy="171" r="3" /><circle cx="240" cy="85" r="3" /><circle cx="276" cy="117" r="3" /><circle cx="338" cy="118" r="3" /><circle cx="408" cy="90" r="3" /><circle cx="451" cy="112" r="3" /><circle cx="429" cy="151" r="3" /><circle cx="304" cy="91" r="3" /></g>
                    </svg>
                </div>
                <div className="global-stats">
                    <div><strong>06</strong><p><b>Centros de pesquisa</b><span>Hubs globais de inovação</span></p></div>
                    <div><strong>12</strong><p><b>Países</b><span>Pesquisa, produção e operações</span></p></div>
                    <div><strong>25K+</strong><p><b>Cientistas e profissionais</b><span>Construindo um futuro mais saudável</span></p></div>
                </div>
                <div className="facility-panel">
                    <img src={photoUrl('/ChatGPT Image 8 de out. de 2026, 19_51_19.png')} alt="Centro corporativo da Umbrella cercado por áreas verdes" loading="lazy" />
                    <p>Ciência<br />sem fronteiras</p>
                </div>
            </section>
        </main>
    )
}

function PageHero({ eyebrow, title, description }) {
    return (
        <section className="page-hero" aria-labelledby="page-title">
            <div className="page-hero-inner">
                <p className="eyebrow"><span /> {eyebrow}</p>
                <h1 id="page-title">{title}</h1>
                <p>{description}</p>
            </div>
            <span className="page-index" aria-hidden="true">U&nbsp; / &nbsp;CORPORATION</span>
        </section>
    )
}

function IntroSection({ eyebrow, title, children, className = '' }) {
    return (
        <section className={`interior-intro ${className}`}>
            <p className="eyebrow"><span /> {eyebrow}</p>
            <h2>{title}</h2>
            <div className="interior-intro-copy">{children}</div>
        </section>
    )
}

function ValueCard({ number, title, description }) {
    return (
        <article className="value-card">
            <span>{number}</span>
            <h3>{title}</h3>
            <p>{description}</p>
        </article>
    )
}

function AboutPage() {
    return (
        <main className="interior-page">
            <PageHero eyebrow="Sobre a Umbrella" title={<>Ciência com propósito.<br /><em>Progresso com responsabilidade.</em></>} description="Unimos conhecimento, tecnologia e colaboração para responder a desafios que importam para a saúde e para o futuro." />
            <section className="story-section">
                <div className="story-copy">
                    <p className="eyebrow"><span /> Nossa visão</p>
                    <h2>Transformar perguntas importantes em avanços para a vida.</h2>
                    <p>Acreditamos que o progresso científico acontece quando diferentes ideias trabalham juntas. Por isso, aproximamos pesquisa, tecnologia e pessoas para desenvolver soluções com rigor e visão de longo prazo.</p>
                    <p>Nosso trabalho é guiado pela curiosidade, pela integridade e pelo compromisso de colocar a segurança e o bem-estar no centro de cada decisão.</p>
                </div>
                <div className="story-image">
                    <img src={photoUrl('/ChatGPT Image 8 de out. de 2026, 19_51_19.png')} alt="Campus de pesquisa cercado por vegetação" loading="lazy" />
                    <span>Ciência em colaboração</span>
                </div>
            </section>
            <section className="values-section">
                <IntroSection eyebrow="O que nos orienta" title={<>Princípios para avançar<br />com confiança.</>}>
                    <p>Excelência técnica e responsabilidade caminham juntas em tudo o que fazemos.</p>
                </IntroSection>
                <div className="value-grid">
                    <ValueCard number="01" title="Integridade" description="Agimos com transparência, responsabilidade e respeito pelas pessoas." />
                    <ValueCard number="02" title="Rigor científico" description="Tomamos decisões com base em evidências, revisão criteriosa e aprendizado contínuo." />
                    <ValueCard number="03" title="Colaboração" description="Conectamos equipes e disciplinas para ampliar o alcance das boas ideias." />
                    <ValueCard number="04" title="Visão de futuro" description="Buscamos soluções que considerem os impactos de longo prazo na saúde e no planeta." />
                </div>
            </section>
            <PageCallout title="Conheça nossas frentes de pesquisa" to="/pesquisa" linkLabel="Explorar pesquisas" />
        </main>
    )
}

function ResearchPage() {
    const [searchParams] = useSearchParams()
    const query = searchParams.get('q')?.trim() ?? ''
    const matchingAreas = researchAreas.filter((area) => `${area.title} ${area.description}`.toLocaleLowerCase('pt-BR').includes(query.toLocaleLowerCase('pt-BR')))

    return (
        <main className="interior-page">
            <PageHero eyebrow="Pesquisa e desenvolvimento" title={<>Conhecimento que abre<br /><em>novas possibilidades.</em></>} description="Nossa pesquisa combina diferentes disciplinas para explorar soluções em saúde, biotecnologia e sustentabilidade." />
            <section className="research-page-section">
                <div className="research-page-heading">
                    <div>
                        <p className="eyebrow"><span /> {query ? 'Resultados da busca' : 'Nossas áreas'}</p>
                        <h2>{query ? `Pesquisa por “${query}”` : 'Frentes conectadas pelo conhecimento.'}</h2>
                    </div>
                    <p>Trabalhamos de forma interdisciplinar, com atenção à qualidade científica, à segurança e ao impacto de cada iniciativa.</p>
                </div>
                {matchingAreas.length > 0 ? (
                    <div className="research-grid research-page-grid">
                        {matchingAreas.map((area, index) => <ResearchCard area={area} index={index} key={area.title} />)}
                    </div>
                ) : (
                    <div className="empty-search"><h3>Nenhuma área encontrada</h3><p>Tente buscar por terapia, vacinas, sustentabilidade ou neurociência.</p><Link className="text-link" to="/pesquisa">Ver todas as áreas <ArrowIcon /></Link></div>
                )}
            </section>
            <section className="research-principles">
                <IntroSection eyebrow="Como trabalhamos" title="Pesquisa responsável, da pergunta ao impacto.">
                    <p>Cada iniciativa começa com uma pergunta clara e avança com colaboração, análise cuidadosa e compromisso com práticas responsáveis.</p>
                </IntroSection>
                <div className="principle-list">
                    <article><span>01</span><div><h3>Rigor e qualidade</h3><p>Processos consistentes sustentam resultados confiáveis e aprendizado contínuo.</p></div></article>
                    <article><span>02</span><div><h3>Segurança em primeiro lugar</h3><p>Avaliamos riscos e responsabilidades ao longo das etapas de desenvolvimento.</p></div></article>
                    <article><span>03</span><div><h3>Parcerias científicas</h3><p>Compartilhamos conhecimento e aproximamos competências para ampliar perspectivas.</p></div></article>
                </div>
            </section>
        </main>
    )
}

function CareersPage() {
    const teams = [
        ['Pesquisa e desenvolvimento', 'Cientistas, especialistas de laboratório e profissionais de dados.'],
        ['Operações e qualidade', 'Equipes que apoiam processos seguros, consistentes e confiáveis.'],
        ['Tecnologia e produto', 'Talentos que constroem ferramentas e experiências para a ciência.'],
        ['Áreas corporativas', 'Comunicação, pessoas, finanças, jurídico e outras funções essenciais.'],
    ]

    return (
        <main className="interior-page">
            <PageHero eyebrow="Carreiras" title={<>Construa o futuro<br /><em>com a gente.</em></>} description="Há muitas maneiras de contribuir para uma ciência mais colaborativa. Conheça as áreas que fazem a Umbrella avançar." />
            <section className="careers-feature">
                <div className="careers-image"><img src={photoUrl('/ChatGPT Image 8 de out. de 2026, 19_51_15.png')} alt="Pesquisadora trabalhando em uma análise científica" loading="lazy" /></div>
                <div className="careers-copy">
                    <p className="eyebrow"><span /> Pessoas e propósito</p>
                    <h2>Boas ideias crescem quando perspectivas diferentes se encontram.</h2>
                    <p>Na Umbrella, reunimos pessoas com experiências e especialidades diversas. Incentivamos a troca, a curiosidade e o desenvolvimento profissional em um ambiente que valoriza o trabalho bem feito.</p>
                    <Link className="button button-red" to="/contato">Fale com nossa equipe <ArrowIcon /></Link>
                </div>
            </section>
            <section className="teams-section">
                <IntroSection eyebrow="Áreas de atuação" title="Encontre onde seu talento pode fazer diferença.">
                    <p>Conheça algumas das equipes que trabalham juntas para transformar conhecimento em progresso.</p>
                </IntroSection>
                <div className="team-grid">
                    {teams.map(([title, description], index) => <ValueCard key={title} number={`0${index + 1}`} title={title} description={description} />)}
                </div>
            </section>
            <PageCallout title="Quer saber mais sobre oportunidades?" to="/contato" linkLabel="Entre em contato" />
        </main>
    )
}

function NewsPage() {
    const stories = [
        { category: 'Pesquisa', title: 'Colaboração científica amplia caminhos para a inovação', text: 'Conheça como equipes multidisciplinares conectam perguntas, métodos e conhecimentos em novas frentes de estudo.', icon: '01' },
        { category: 'Pessoas', title: 'Ideias diferentes fortalecem uma ciência mais completa', text: 'Uma cultura de aprendizado contínuo começa com a escuta e com espaço para novas perspectivas.', icon: '02' },
        { category: 'Sustentabilidade', title: 'Pensar no longo prazo também faz parte da pesquisa', text: 'Práticas responsáveis ajudam a orientar decisões em todas as etapas de desenvolvimento.', icon: '03' },
    ]

    return (
        <main className="interior-page">
            <PageHero eyebrow="Notícias e perspectivas" title={<>Ideias, descobertas<br /><em>e novos horizontes.</em></>} description="Acompanhe os temas, as pessoas e as iniciativas que movimentam a ciência e a biotecnologia na Umbrella." />
            <section className="news-section">
                <div className="research-page-heading">
                    <div><p className="eyebrow"><span /> Em destaque</p><h2>O que está em pauta.</h2></div>
                    <p>Perspectivas sobre pesquisa, colaboração e responsabilidade no avanço científico.</p>
                </div>
                <div className="news-grid">
                    {stories.map((story) => (
                        <article className="news-card" key={story.icon}>
                            <div className="news-card-top"><span>{story.category}</span><b>{story.icon}</b></div>
                            <h3>{story.title}</h3>
                            <p>{story.text}</p>
                            <Link className="text-link" to="/pesquisa">Saiba mais <ArrowIcon /></Link>
                        </article>
                    ))}
                </div>
            </section>
            <section className="news-note"><p className="eyebrow"><span /> Sala de imprensa</p><h2>Para conversas sobre a Umbrella, fale com nossa equipe.</h2><Link className="text-link" to="/contato">Acesse os canais de contato <ArrowIcon /></Link></section>
        </main>
    )
}

function ContactPage() {
    const submitContact = (event) => {
        event.preventDefault()
        const fields = [...new FormData(event.currentTarget).entries()]
        const body = fields.map(([label, value]) => `${label}: ${value}`).join('\n')
        const subject = fields.find(([label]) => label === 'assunto')?.[1] ?? 'Contato Umbrella'
        window.location.href = `mailto:contato@umbrella.com.br?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    }

    return (
        <main className="interior-page">
            <PageHero eyebrow="Contato" title={<>Vamos conversar<br /><em>sobre o que vem a seguir.</em></>} description="Escolha o canal mais adequado ou envie uma mensagem para nossa equipe. Será um prazer ouvir você." />
            <section className="contact-section">
                <div className="contact-info">
                    <p className="eyebrow"><span /> Fale com a Umbrella</p>
                    <h2>Como podemos ajudar?</h2>
                    <p>Direcione sua mensagem para o tema mais próximo do que você procura. Nossa equipe poderá encaminhar sua solicitação.</p>
                    <div className="contact-channel"><span>01</span><div><h3>Imprensa e comunicação</h3><p>Solicitações de entrevistas e informações institucionais.</p></div></div>
                    <div className="contact-channel"><span>02</span><div><h3>Parcerias e pesquisa</h3><p>Conversas sobre colaboração científica e novas ideias.</p></div></div>
                    <div className="contact-channel"><span>03</span><div><h3>Carreiras</h3><p>Dúvidas sobre áreas de atuação e oportunidades.</p></div></div>
                </div>
                <form className="contact-form" onSubmit={submitContact}>
                    <label htmlFor="nome">Nome</label>
                    <input id="nome" name="nome" autoComplete="name" required />
                    <label htmlFor="email">E-mail</label>
                    <input id="email" name="email" type="email" autoComplete="email" required />
                    <label htmlFor="assunto">Assunto</label>
                    <select id="assunto" name="assunto" defaultValue="" required>
                        <option value="" disabled>Selecione um assunto</option>
                        <option>Imprensa e comunicação</option>
                        <option>Parcerias e pesquisa</option>
                        <option>Carreiras</option>
                        <option>Outro assunto</option>
                    </select>
                    <label htmlFor="mensagem">Mensagem</label>
                    <textarea id="mensagem" name="mensagem" rows="5" required />
                    <p className="form-note">Ao enviar, seu aplicativo de e-mail será aberto com a mensagem preparada.</p>
                    <button className="button button-red" type="submit">Preparar mensagem <ArrowIcon /></button>
                </form>
            </section>
        </main>
    )
}

function PageCallout({ title, to, linkLabel }) {
    return <section className="page-callout"><div><p className="eyebrow"><span /> Umbrella Corporation</p><h2>{title}</h2></div><Link className="button button-red" to={to}>{linkLabel} <ArrowIcon /></Link></section>
}

function NotFoundPage() {
    return (
        <main className="not-found-page">
            <p className="eyebrow"><span /> Erro 404</p>
            <h1>Não encontramos<br />esta página.</h1>
            <p>O endereço pode ter mudado. Volte ao início para continuar explorando a Umbrella.</p>
            <Link className="button button-red" to="/">Voltar ao início <ArrowIcon /></Link>
        </main>
    )
}

function AppShell() {
    const location = useLocation()

    useEffect(() => {
        const section = pageTitles[location.pathname] ?? 'Página não encontrada'
        document.title = `${section} | Umbrella Corporation`
        window.scrollTo(0, 0)
    }, [location.pathname])

    return (
        <>
            <SiteHeader />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/sobre" element={<AboutPage />} />
                <Route path="/pesquisa" element={<ResearchPage />} />
                <Route path="/carreiras" element={<CareersPage />} />
                <Route path="/noticias" element={<NewsPage />} />
                <Route path="/contato" element={<ContactPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <SiteFooter />
        </>
    )
}

function UmbrellaCorporationMain() {
    return <BrowserRouter><AppShell /></BrowserRouter>
}

export default UmbrellaCorporationMain
