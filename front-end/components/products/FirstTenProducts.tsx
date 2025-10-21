import React from "react";
import { ProductInput } from "@types";

type FirstTenProductsProps = {
    firstTenProducts: ProductInput[];
};

const FirstTenProducts: React.FC<FirstTenProductsProps> = ({ firstTenProducts }) => {
    return (
        <div className="p-4 bg-white rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Top 10 Products
            </h2>

            {firstTenProducts.length === 0 ? (
                <p className="text-gray-500 text-center py-6">
                    No products available.
                </p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-200 text-sm text-left">
                        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                            <tr>
                                <th className="px-4 py-2 border-b">ID</th>
                                <th className="px-4 py-2 border-b">Name</th>
                                <th className="px-4 py-2 border-b">Brand</th>
                                <th className="px-4 py-2 border-b">Category</th>
                                <th className="px-4 py-2 border-b">Energy (kcal)</th>
                                <th className="px-4 py-2 border-b">Protein (g)</th>
                                <th className="px-4 py-2 border-b">Fat (g)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {firstTenProducts.map((product) => (
                                <tr
                                    key={product.id}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <td className="px-4 py-2 border-b">{product.id}</td>
                                    <td className="px-4 py-2 border-b">{product.name}</td>
                                    <td className="px-4 py-2 border-b">
                                        {product.brands || "—"}
                                    </td>
                                    <td className="px-4 py-2 border-b">
                                        {product.categories || "—"}
                                    </td>
                                    <td className="px-4 py-2 border-b">
                                        {product.energy ?? "—"}
                                    </td>
                                    <td className="px-4 py-2 border-b">
                                        {product.protein ?? "—"}
                                    </td>
                                    <td className="px-4 py-2 border-b">
                                        {product.fat ?? "—"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default FirstTenProducts;
