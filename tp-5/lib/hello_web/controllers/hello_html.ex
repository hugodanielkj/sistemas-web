defmodule HelloWeb.HelloHTML do
  use HelloWeb, :html

  embed_templates "hello_html/*"

  # Função auxiliar de apresentação (Slide 48) para deixar a primeira letra maiúscula
  def format_name(name) do
    String.capitalize(name)
  end
end
