const withLoading = (WrappedComponent) => {
  return function WithLoadingComponent({isLoading, ...props}) {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    return <WrappedComponent {...props} />;
  };
};

export default withLoading;
