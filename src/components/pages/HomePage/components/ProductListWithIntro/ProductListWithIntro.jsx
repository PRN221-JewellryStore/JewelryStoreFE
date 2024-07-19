import { Container } from 'reactstrap';
import { ProductList } from 'src/components';

export const ProductListWithIntro = ({
  description,
  title,
  name,
  products,
  ...args
}) => {
  return (
    <div className="my-[120px] mb-[70px]">
      <Container className="max-w-screen-xl">
        <div className="pb-[40px]">
          <p>{description}</p>
          <h2 className="text-2xl font-bold">
            {title} <span className="border-b-2 border-[#384aeb] pb-[8px]">{name}</span>
          </h2>
        </div>
        <ProductList products={products} {...args} />
      </Container>
    </div>
  );
};
