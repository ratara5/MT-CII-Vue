import { mount } from "@vue/test-utils";
import App from "./../src/App.vue";

describe("App", () => {
  // Inspect the raw component options
  it("has data", () => {
    expect(typeof App.data).toBe("function");
  });
});

describe("Mounted App", () => {
  const wrapper = mount(App);

  test("is a Vue instance", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});

describe("Mounted App", () => {
  const wrapper = mount(App);

  it("renders the correct markup", () => {
    expect(wrapper.html()).toContain("What is the sum of the two numbers?");
  });
});

describe("Mounted App", () => {
  const wrapper = mount(App);

  it("has a button", () => {
    expect(wrapper.contains("button")).toBe(true);
  });
});

describe("Mounted App", () => {
  const wrapper = mount(App);

  it("renders correctly with different data", async () => {
    wrapper.setData({ x1: 5, x2: 10 });
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain("10");
  });
});

describe("Mounted App", () => {
  const wrapper = mount(App);

  it("button click without correct sum", () => {
    expect(wrapper.vm.message).toBe("");
    const button = wrapper.find("button");
    button.trigger("click");
    expect(wrapper.vm.message).toBe("TRY AGAIN");
  });
});
