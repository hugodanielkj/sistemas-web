defmodule HelloWeb.Router do
  use HelloWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, html: {HelloWeb.Layouts, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", HelloWeb do
    pipe_through :browser

    get "/", PageController, :home

    # Exemplo guiado dos slides (Slides 18 e 27)
    get "/hello", HelloController, :world
    get "/hello/:name", HelloController, :world

    # Atividade Prática Integradora (Slide 75 - Requisito 01)
    get "/saudacao/:lang/:name", HelloController, :saudacao
  end
end
