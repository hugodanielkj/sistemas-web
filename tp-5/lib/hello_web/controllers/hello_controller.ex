defmodule HelloWeb.HelloController do
  use HelloWeb, :controller

  # Exemplo guiado dos slides (Slides 20 e 29)
  def world(conn, %{"name" => nome}) do
    render(conn, :world, name: nome)
  end

  def world(conn, _params) do
    render(conn, :world, name: "world")
  end

  # =========================================================================
  # Atividade Prática Integradora (Slides 75 e 76)
  # Requisito 02: Action saudacao/2 no HelloController
  # Requisito 03: Pattern Matching diretamente no cabeçalho das cláusulas
  #               para filtrar os idiomas "pt" e "en"
  # Requisito 04: Mensagens "Olá, [Nome]!" ("pt") e "Hello, [Nome]!" ("en")
  # =========================================================================

  def saudacao(conn, %{"lang" => "pt", "name" => nome}) do
    render(conn, :saudacao,
      saudacao_texto: "Olá",
      name: nome,
      page_title: "Page",
      page_title_suffix: ""
    )
  end

  def saudacao(conn, %{"lang" => "en", "name" => nome}) do
    render(conn, :saudacao,
      saudacao_texto: "Hello",
      name: nome,
      page_title: "Page",
      page_title_suffix: ""
    )
  end
end
