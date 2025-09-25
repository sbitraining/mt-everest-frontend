import { TrendingUp, Award, Zap } from "lucide-react";

const Topsellersection = () => {
  return (
    <section className="bg-[#fffff6] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header with icon */}
        <div className="flex items-center justify-center mb-6">
          <TrendingUp className="h-8 w-8  mr-3 text-primary" />
          <span className="text-lg font-medium text-gray-600">
            Best Sellers
          </span>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Top Products Everyone's Buying
        </h1>

        {/* Subheading */}
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          Discover our most popular products, carefully curated based on
          customer satisfaction and sales performance
        </p>

        {/* Feature badges */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12">
          <div className="flex items-center">
            <Award className="h-6 w-6 text-primary mr-3" />
            <span className="text-gray-700 font-medium">
              Quality Guaranteed
            </span>
          </div>

          <div className="flex items-center">
            <Zap className="h-6 w-6 text-primary mr-3" />
            <span className="text-gray-700 font-medium">Fast Shipping</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Topsellersection;
