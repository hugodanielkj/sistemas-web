defmodule LanguageList do
  def new() do
    []
  end

  def add(list, language) do
    [language | list]
  end

  def remove([_ | resto]) do
    resto
  end

  def first([primeira | _]) do
    primeira
  end

  def count(list) do
    length(list)
  end

  def functional_list?(list) do
    "Elixir" in list
  end
end
