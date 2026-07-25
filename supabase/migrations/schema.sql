-- Supabase Schema for Wrought — Premium Panini Press E-Commerce Store

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PRODUCTS TABLE
create table public.products (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    description text,
    base_price numeric not null,
    image_url text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for products
alter table public.products enable row level security;
create policy "Allow public read access to products" on public.products for select using (true);

-- 2. PLATE OPTIONS TABLE
create table public.plate_options (
    id text primary key,
    name text not null,
    price_delta numeric default 0 not null,
    description text,
    image_url text
);

-- RLS for plate_options
alter table public.plate_options enable row level security;
create policy "Allow public read access to plate_options" on public.plate_options for select using (true);

-- 3. ADDON OPTIONS TABLE
create table public.addon_options (
    id text primary key,
    name text not null,
    price_delta numeric default 0 not null,
    description text
);

-- RLS for addon_options
alter table public.addon_options enable row level security;
create policy "Allow public read access to addon_options" on public.addon_options for select using (true);

-- 4. RECIPES TABLE
create table public.recipes (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    slug text unique not null,
    body text not null,
    top_zone_temp integer not null,
    bottom_zone_temp integer not null,
    image_url text,
    published_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for recipes
alter table public.recipes enable row level security;
create policy "Allow public read access to recipes" on public.recipes for select using (true);

-- 5. ORDERS TABLE
create table public.orders (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users(id) on delete set null,
    status text default 'pending'::text not null,
    shipping_address jsonb not null,
    subtotal numeric not null,
    shipping_cost numeric not null,
    tax numeric not null,
    total numeric not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for orders
alter table public.orders enable row level security;
create policy "Allow authenticated users to read their own orders" on public.orders 
    for select using (auth.uid() = user_id);
create policy "Allow anyone to insert orders" on public.orders 
    for insert with check (true);

-- 6. ORDER ITEMS TABLE
create table public.order_items (
    id uuid default gen_random_uuid() primary key,
    order_id uuid references public.orders(id) on delete cascade not null,
    plate_option_id text references public.plate_options(id) not null,
    addon_option_ids text[] default '{}'::text[] not null,
    quantity integer not null check (quantity > 0),
    unit_price numeric not null
);

-- RLS for order_items
alter table public.order_items enable row level security;
create policy "Allow authenticated users to read their own order items" on public.order_items 
    for select using (
        exists (
            select 1 from public.orders 
            where orders.id = order_items.order_id 
            and (orders.user_id = auth.uid() or orders.user_id is null)
        )
    );
create policy "Allow anyone to insert order items" on public.order_items 
    for insert with check (true);

-- 7. SHIPPING RATES TABLE
create table public.shipping_rates (
    zone text primary key,
    rate numeric not null
);

-- RLS for shipping_rates
alter table public.shipping_rates enable row level security;
create policy "Allow public read access to shipping_rates" on public.shipping_rates for select using (true);


-- ========================================================
-- SEED DATA
-- ========================================================

-- Seed Products
insert into public.products (id, name, description, base_price, image_url) values
('d7647240-7ecb-432d-862d-947761019688', 'Wrought Panini Press', 'The ultimate dual-zone modular panini press, built with industrial-grade parallel hinge mechanics and user-repairable heating blocks.', 349.00, '/images/product-base.jpg')
on conflict (id) do nothing;

-- Seed Plate Options
insert into public.plate_options (id, name, price_delta, description, image_url) values
('grille', 'The Grille', 0.00, 'Heavy ridged iron plates designed for classic sear marks on paninis and meat.', '/images/plate-grille.png'),
('lattice', 'The Lattice', 25.00, 'Ornamental waffle pattern plates optimized for uniform heat and crisp detail.', '/images/plate-lattice.png'),
('anvil', 'The Anvil', 0.00, 'Smooth forged flat surface ideal for griddling, searing, and parallel pressing.', '/images/plate-anvil.png')
on conflict (id) do update set name = excluded.name, price_delta = excluded.price_delta, description = excluded.description;

-- Seed Addon Options
insert into public.addon_options (id, name, price_delta, description) values
('butter_roller', 'Butter/Oil Roller Reservoir', 39.00, 'Rotary oil spreader that fits directly onto the base for rapid bread coating.'),
('crimper_zone', 'Edge-Sealing Crimper Zone', 29.00, 'Modular metal crimper inserts to seal sandwich edges and lock in melted fillings.'),
('steam_vent', 'Steam Vent w/ Herb-Infused Water Reservoir', 49.00, 'Continuous steaming element to tenderize fillings while keeping the exterior perfectly crisp.')
on conflict (id) do update set name = excluded.name, price_delta = excluded.price_delta, description = excluded.description;

-- Seed Recipes
insert into public.recipes (id, title, slug, body, top_zone_temp, bottom_zone_temp, image_url) values
(
    'a4d95221-d1c0-4321-ba2a-ea9121a97d91', 
    'Sourdough Prosciutto Melt', 
    'sourdough-prosciutto-melt', 
    'A classic, robust melt featuring thin layers of prosciutto di Parma, sharp gruyère cheese, and fresh heirloom tomato slices nestled inside stone-baked sourdough slices brushed with rosemary-infused olive oil. We recommend using The Anvil or The Grille plates to achieve a thick, satisfying crunch.', 
    375, 
    400, 
    '/images/recipe-prosciutto.jpg'
),
(
    'b2c83210-b74d-4521-a477-ba912fa92c31', 
    'Lattice-Iron Liège Waffles', 
    'lattice-iron-liege-waffles', 
    'Traditional Belgian waffles made with yeast-risen brioche dough studded with imported pearl sugar. As the waffle presses in The Lattice, the sugar caramelizes on the exterior, creating a crisp glaze. Set both zones to equal heat to ensure optimal rise and caramelization without burning.', 
    350, 
    350, 
    '/images/recipe-waffles.jpg'
),
(
    'c6d59421-4fa2-432d-9477-019bbccaa211', 
    'Pressed Croque Monsieur', 
    'pressed-croque-monsieur', 
    'A decadent French classic filled with thick-cut black forest ham, creamy Béchamel sauce, and dijon mustard, topped with bubbly Emmental cheese. Using a slightly cooler top zone allows the cheese to melt and brown perfectly while the hotter bottom zone toasts the brioche bread.', 
    325, 
    350, 
    '/images/recipe-croque.jpg'
)
on conflict (id) do nothing;

-- Seed Shipping Rates
insert into public.shipping_rates (zone, rate) values
('Eastern US', 15.00),
('Central US', 18.00),
('Mountain US', 20.00),
('Pacific US', 22.00),
('Alaska & Hawaii', 35.00)
on conflict (zone) do update set rate = excluded.rate;

-- 8. USER FAVORITES TABLE
create table public.user_favorites (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users(id) on delete cascade not null,
    recipe_id uuid references public.recipes(id) on delete cascade not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(user_id, recipe_id)
);

-- RLS for user_favorites
alter table public.user_favorites enable row level security;
create policy "Allow authenticated users to manage their own favorites" on public.user_favorites
    for all using (auth.uid() = user_id);

