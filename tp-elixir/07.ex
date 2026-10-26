defmodule KitchenCalculator do
  def get_volume(volume_pair) do
    {_, volume} = volume_pair
    volume
  end

  def to_milliliter(volume_pair) do
    {unit, volume} = volume_pair

    cond do
      unit == :milliliter -> {:milliliter, volume}
      unit == :cup -> {:milliliter, volume * 240}
      unit == :fluid_ounce -> {:milliliter, volume * 30}
      unit == :teaspoon -> {:milliliter, volume * 5}
      unit == :tablespoon -> {:milliliter, volume * 15}
    end
  end

  def from_milliliter(volume_pair, unit) do
    volume = get_volume(volume_pair)

    cond do
      unit == :milliliter -> {:milliliter, volume}
      unit == :cup -> {:cup, volume / 240}
      unit == :fluid_ounce -> {:fluid_ounce, volume / 30}
      unit == :teaspoon -> {:teaspoon, volume / 5}
      unit == :tablespoon -> {:tablespoon, volume / 15}
    end
  end

  def convert(volume_pair, unit) do
    in_milliliters = to_milliliter(volume_pair)
    from_milliliter(in_milliliters, unit)
  end
end