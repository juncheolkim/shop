import { useParams } from "react-router-dom";

export default function ProductsPage() {
    return <>{useParams().id}번 상품 상세페이지</>;
}
