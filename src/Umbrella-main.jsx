import { useState } from 'react'
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

function UmbrellaCorporationMain() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)

    const closeMenu = () => setMenuOpen(false)

    return (
        <>
            <header className="site-header">
                <a className="brand" href="#inicio" aria-label="Umbrella Corporation, início" onClick={closeMenu}>
                    <UmbrellaMark />
                    <span className="brand-name">UMBRELLA<span>CORPORATION</span></span>
                    <span className="brand-divider" />
                    <span className="brand-motto">Biotecnologia&nbsp; / &nbsp;Saúde&nbsp; / &nbsp;Um amanhã mais seguro</span>
                </a>

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
                    <a className="active" href="#inicio" onClick={closeMenu}>Início</a>
                    <a href="#sobre" onClick={closeMenu}>Sobre</a>
                    <a href="#pesquisa" onClick={closeMenu}>Pesquisa</a>
                    <a href="#carreiras" onClick={closeMenu}>Carreiras</a>
                    <a href="#noticias" onClick={closeMenu}>Notícias</a>
                    <a href="#contato" onClick={closeMenu}>Contato</a>
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
                    <form className="search-panel" role="search" onSubmit={(event) => event.preventDefault()}>
                        <label htmlFor="site-search">Buscar no site</label>
                        <input id="site-search" type="search" placeholder="O que você procura?" autoFocus />
                        <button type="submit" aria-label="Buscar"><ArrowIcon /></button>
                    </form>
                )}
            </header>

            <main>
                <section className="hero" id="inicio" aria-labelledby="hero-title">
                    <div className="hero-image" />
                    <div className="hero-content">
                        <p className="eyebrow"><span /> Umbrella Corporation</p>
                        <h1 id="hero-title">Avançando a vida<br />por meio da <em>inovação</em></h1>
                        <p className="hero-copy">Somos uma empresa global de biotecnologia dedicada à excelência científica, à saúde humana e a um futuro mais sustentável. Transformamos possibilidades em progresso.</p>
                        <a className="button button-red" href="#pesquisa">Conheça nossas pesquisas <ArrowIcon /></a>
                    </div>
                    <p className="hero-side-note">Melhor ciência.<br />Pessoas mais saudáveis.<br />Um planeta mais forte.</p>
                    <div className="hero-pagination" aria-hidden="true"><span /><i /><i /></div>
                </section>

                <section className="research-section" id="pesquisa" aria-labelledby="research-title">
                    <div className="section-intro">
                        <p className="eyebrow"><span /> Nossas áreas de pesquisa</p>
                        <h2 id="research-title">Descobertas que<br />movem a biotecnologia</h2>
                        <p>De terapias de última geração a soluções sustentáveis, nossa pesquisa conecta disciplinas para gerar impacto no mundo real.</p>
                        <a className="text-link" href="#sobre">Explore todas as pesquisas <ArrowIcon /></a>
                    </div>
                    <div className="research-grid">
                        {researchAreas.map((area, index) => (
                            <article className="research-card" key={area.title}>
                                <a href="#sobre" className="card-image-link" aria-label={`Saiba mais sobre ${area.title}`}>
                                    <img src={photoUrl(area.image, 720)} alt={area.alt} loading={index === 0 ? 'eager' : 'lazy'} />
                                </a>
                                <div className="card-content">
                                    <AreaIcon name={area.icon} />
                                    <h3>{area.title}</h3>
                                    <p>{area.description}</p>
                                    <a className="text-link" href="#sobre">Saiba mais <ArrowIcon /></a>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="global-section" id="sobre" aria-labelledby="global-title">
                    <div className="global-copy">
                        <p className="eyebrow"><span /> Presença global</p>
                        <h2 id="global-title">Um compromisso<br />com o mundo</h2>
                        <p>Nossas instalações, centros de pesquisa e equipes atuam em todo o planeta, levando ciência adiante em cada região.</p>
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

            <footer className="site-footer" id="contato">
                <a className="footer-brand" href="#inicio" aria-label="Umbrella Corporation, voltar ao início"><UmbrellaMark /><span>UMBRELLA<small>CORPORATION</small></span></a>
                <nav aria-label="Navegação do rodapé">
                    <a href="#inicio">Início</a><a href="#sobre">Sobre</a><a href="#pesquisa">Pesquisa</a><a href="#carreiras">Carreiras</a><a href="#noticias">Notícias</a><a href="#contato">Contato</a>
                </nav>
                <div className="social-links" aria-label="Redes sociais">
                    <a href="#contato" aria-label="LinkedIn">in</a><a href="#contato" aria-label="X">X</a><a href="#contato" aria-label="YouTube">▶</a><a href="#contato" aria-label="Instagram">◎</a>
                </div>
                <small className="copyright">© 2026 Umbrella Corporation. Todos os direitos reservados.</small>
            </footer>
        </>
    )
}

export default UmbrellaCorporationMain