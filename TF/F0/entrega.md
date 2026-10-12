# Entrega F0

## Nome do Sistema
O sistema desenvolvido denomina-se "Drone Route Op+miza+on System" — em português, Sistema de Otimização de Rotas para Drones de Irrigação. O nome reflete diretamente o núcleo funcional do sistema: o cálculo de rotas de menor custo energé+co para drones agrícolas empregados em operações de irrigação.

## Descrição do Problema ou Necessidade
O uso de drones para irrigação agrícola vem crescendo como alterna+va a sistemas fixos de irrigação, por sua flexibilidade em atender áreas irregulares ou de dificil acesso. Entretanto, essa operação é
fortemente limitada pela autonomia de bateria do drone: cada voo consome energia em função da distância percorrida, da velocidade de deslocamento, do tempo parado em cada ponto de irrigação e do peso da carga restante a cada entrega já realizada. Sem um planejamento adequado, o operador tende a definir rotas de forma manual ou puramente intuitiva, o que resulta em consumo energético maior do que o necessário, recargas de bateria mais frequentes do que o estritamente exigido pela área de operação, ou mesmo tentativas de rota que excedem a capacidade real do drone e não podem ser concluídas. Além disso, esse planejamento manual não é repeSvel nem consistente: refeito por pessoas diferentes, ou em momentos diferentes, tende a produzir resultados distintos para a mesma área e o mesmo equipamento. Existe, portanto, a necessidade de um sistema que, a partir das características Msicas de um drone e da geometria de uma área de operação (um ponto de carregamento e um conjunto de pontos de irrigação), calcule de forma determinística e automática a divisão da área em trechos de voo viáveis — cada um respeitando a capacidade de bateria do equipamento — minimizando o consumo energé+co total da operação.

## Objetivo do Sistema
O objetivo do sistema é fornecer um serviço de full-stack que permite que o usuário se auten+que,
cadastre um drone (com seu consumo energético por irrigação, velocidade média e capacidade de
bateria) e um mapa de operação (ponto de carregamento e pontos de irrigação), calcule
automaticamente a rota de menor custo energé+co para cobrir todos os pontos de irrigação, dividindo-a
em uma ou mais pernas de voo que partem e retornam ao ponto de carregamento sem exceder a
capacidade operacional do drone.

## Público-Alvo
O público-alvo principal são operadores e produtores agrícolas que utilizam drones para irrigação e
precisam planejar, de forma eficiente, como cobrir uma área de cultivo composta por múltiplos pontos de
irrigação a partir de um único ponto de carregamento Trata-se de usuários que possuem um ou mais
drones, com características técnicas distintas entre si, e que operam diferentes áreas (mapas) ao longo do tempo — daí o caráter multiusuário do sistema, em que cada usuário cadastra, consulta e gerencia
exclusivamente seus próprios drones, mapas e missões calculadas. De forma secundária, no contexto acadêmico em que este sistema foi desenvolvido, o público-alvo inclui interessados na correção do modelo de domínio, das regras de negócio implementadas e da qualidade da
solução técnica proposta.

## Principais Funcionalidades
As funcionalidades a seguir estão implementadas e expostas como uma API REST autenticada, refletindo
diretamente as regras de negócio do sistema:

Cadastro e autenticação de usuário: Cadastro apenas com nome e senha, com senha
armazenada exclusivamente como hash (nunca em
texto plano) e autenticação via login que emite um
token de acesso. Não há mecanismo de recuperação de
senha nesta fase.

Gestão de drones: Cadastro, consulta, edição e remoção de drones
pertencentes ao usuário autenticado, com validação de
que consumo por irrigação, velocidade média e
capacidade de bateria são sempre valores positivos.
Um mesmo drone pode ser reutilizado em cálculos com
múl+plos mapas do mesmo usuário.

Gestão de mapas: Cadastro, consulta, edição e remoção de mapas, cada
um com um único ponto de carregamento e uma lista
de pontos de irrigação (entre 1 e 1000), com garan+a
de que nenhuma coordenada se repete dentro do
mesmo mapa. Pontos de irrigação e o ponto de
carregamento só podem ser alterados por operações
do próprio mapa.

Cálculo de rota otimizada (missão): Cálculo determinístico da rota de menor consumo
energético para um par (drone, mapa), dividida em
pernas de voo dentro da capacidade de bateria do
drone. Solicitações repetidas para o mesmo par
reaproveitam o resultado já calculado, e a edição do
drone ou do mapa desa+va a missão associada, que é
recalculada e rea+vada na próxima solicitação.

Consulta de missões: Listagem resumida das missões do usuário e consulta
detalhada de uma missão específica, incluindo todas as
pernas de rota geradas e o consumo energético total
da operação.

## Descrição Resumida das Principais Telas do Sistema
O escopo do projeto cobre o projeto full-stack que consume a API REST auten+cada via browser.
• Tela de Login / Cadastro — Permite que o usuário crie uma conta (nome e senha) e realize login,
obtendo acesso auten+cado ao restante do sistema.
• Tela de Drones (listagem e cadastro/edição) — Lista os drones cadastrados pelo usuário e permite
criar ou editar um drone, informando nome, consumo por irrigação, velocidade média e capacidade
de bateria.
• Tela de Mapas (listagem e cadastro/edição) — Lista os mapas cadastrados pelo usuário e permite
criar ou editar um mapa, definindo o ponto de carregamento e adicionando, listando ou removendo
pontos de irrigação — idealmente com uma representação visual simples das coordenadas sobre um
plano cartesiano.
• Tela de Missões (listagem) — Lista as missões já calculadas pelo usuário, permi+ndo selecionar um
par (drone, mapa) para solicitar um novo cálculo ou revisitar um resultado já existente.
• Tela de Detalhe da Missão — Exibe o detalhamento de uma missão específica: cada perna de rota
gerada, a sequência de pontos visitados em cada perna e o consumo energé+co total da operação,
idealmente com uma visualização gráfica das pernas sobre o mapa.

## Tecnologias U,lizadas no Desenvolvimento
A tabela a seguir apresenta as tecnologias efe+vamente empregadas no desenvolvimento do backend,
organizadas por camada, além da tecnologia proposta para o frontend em uma fase futura do projeto:
Camada Tecnologia Finalidade
Linguagem / Runtime Elixir Execução e lógica do backend
Framework web Phoenix Roteamento HTTP e definição dos
endpoints REST
Persistência / ORM Prisma 5 + PostgreSQL Modelagem, migrações e acesso ao
banco de dados relacional
Validação de entrada Zod Validação e +pagem dos dados
recebidos pela API
Autenticação JWT (jsonwebtoken) + bcryptjs Emissão de token de acesso e hash
seguro de senha
Testes Jest + Supertest Testes unitários do motor de cálculo
e testes de integração da API
Frontend HTML Puro Construção das telas de interação
com o usuário final, consumindo a
API REST existente