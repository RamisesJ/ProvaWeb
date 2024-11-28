create table produto(
                        id serial primary key,
                        codigo varchar(20) not null,
                        nome varchar(225) not null,
                        preco numeric(10,2) not null,
                        descricao varchar(225) not null,
                        quantidade integer not null
);

alter table produto
    add constraint pk_produto unique (codigo);