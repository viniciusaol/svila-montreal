# Guia Svila + Montreal

Página estática em oito telas, feita para celular e computador. Abra `index.html` no navegador para revisão local. Não há compilação nem dependências a instalar.

Endereço público: **https://svila.montrealtenis.com.br/**

## Publicação com GitHub Pages

1. Criar repositório dedicado `viniciusaol/svila-montreal` e enviar os arquivos desta pasta para a raiz da branch `main`.
2. Em Settings → Pages, selecionar Deploy from a branch → main → /(root).
3. Configurar o domínio personalizado `svila.montrealtenis.com.br` no Pages antes de adicionar o registro no provedor DNS.
4. No DNS da HostGator, criar somente este registro:

| Tipo | Nome | Destino |
| --- | --- | --- |
| CNAME | svila | viniciusaol.github.io |

O destino é o domínio da conta GitHub, sem nome de repositório e sem `https://`. O arquivo `CNAME` e `.nojekyll` já estão incluídos. Depois da validação do domínio, habilitar HTTPS e verificar o site por uma conexão externa antes da impressão.

Referência: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

## Conteúdo e identidade

Gravação e ferramentas atualmente disponíveis: R$ 25. Disponível por enquanto na quadra 04. Active Play e gravação automática ativos, conforme informação da Montreal. Iniciar antes da partida não exige pagamento antecipado; o vídeo fica bloqueado até o pagamento depois do jogo. Para uma partida já encerrada sem início manual, a recepção realiza o resgate após o pagamento. O resgate direto pelo jogador ainda está em testes, sem data pública de lançamento. Análise completa por IA e Smart Crop em desenvolvimento, sem preço futuro divulgado. Os logos e a imagem de interface foram extraídos da referência fornecida. A fonte Inter acompanha sua licença em `assets/Inter-OFL.txt`.
